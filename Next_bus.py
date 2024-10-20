import requests
from bs4 import BeautifulSoup
import re
from fuzzywuzzy import process
from datetime import datetime,timedelta
from Bus_number import find_bus_number
# Base URL to fetch data from
base_url = "https://coimbatore.citybus.co.in/"

# Custom headers to mimic a web browser
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,/;q=0.8"
}

# Fetch the page content
def fetch_html(url):
    response = requests.get(url, headers=headers)
    response.raise_for_status()  # Raise an error for bad responses
    return response.text

# Extract bus stop names and links
def extract_bus_stops(html):
    soup = BeautifulSoup(html, 'html.parser')
    bus_stops = soup.find_all('a', class_='tag-cloud-link')
    stop_data = {stop.text.strip().lower(): stop['href'] for stop in bus_stops}
    return stop_data

# Get bus numbers for a specific bus stop
def fetch_bus_numbers(stop_url):
    html_content = fetch_html(stop_url)
    soup = BeautifulSoup(html_content, 'html.parser')
    text_content = soup.get_text()
    
    bus_number_pattern = r'\b[A-Z]?\d+[A-Z]?\b'
    bus_numbers = re.findall(bus_number_pattern, text_content)

    return set(bus_numbers) if bus_numbers else set()

# Check if a bus route is valid
def check_bus_route(bus_number):
    bus_url = f"https://coimbatore.citybus.co.in/?s={bus_number}"
    try:
        html_content = fetch_html(bus_url)
        return extract_route_links(bus_url)  # Returns links if valid
    except requests.HTTPError:
        return None

# Extract route links based on bus route
def extract_route_links(bus_url):
    html_content = fetch_html(bus_url)
    soup = BeautifulSoup(html_content, 'html.parser')

    links = {}
    for a in soup.find_all('a'):
        if re.search("Continue reading", a.text, re.IGNORECASE):
            href = a.get('href')
            text = a.get_text(strip=True).replace('”', '').replace('"', '').strip()
            match = re.search(r'towards (.+)', text, re.IGNORECASE)
            if match:
                destination = match.group(1).strip().lower()
                links[destination] = href

    return links

def fetch_route_map(link):
    bus_timings = {}
    page_number = 1
    previous_station_names = None
    
    while True:
        page_url = f"{link}?page={page_number}"
        print(f"Fetching data from: {page_url}")
        
        html_content = fetch_html(page_url)
        
        if not html_content:
            print(f"Page {page_number} seems to be empty or invalid. Stopping.")
            break
        
        soup = BeautifulSoup(html_content, 'html.parser')
        station_headings = soup.find_all('h5')

        for station_heading in station_headings:
            station_name_raw = station_heading.get_text(strip=True)
            station_name = re.search(r'from(.+?)towards', station_name_raw, re.IGNORECASE)
            if station_name:
                station_name = station_name.group(1).strip().lower()
            else:
                station_name = station_name_raw.lower()

            print(f"Processing station: {station_name}")

            next_ul = station_heading.find_next('ul', class_='timings-from-other-stops')
            if next_ul:
                timings = set()
                for timing_li in next_ul.find_all('li'):
                    timing_text = timing_li.get_text(strip=True)
                    if re.match(r'\d{1,2}:\d{2} (AM|PM)', timing_text):
                        timings.add(timing_text)

                if timings:
                    bus_timings[station_name] = timings
                    print(f"Timings for {station_name}: {timings}")
                else:
                    print(f"No timings found for {station_name}.")
            else:
                print(f"No <ul> tag found for station: {station_name}")

        current_station_names = [heading.get_text(strip=True).split(',')[0].lower() for heading in station_headings]
        if current_station_names == previous_station_names:
            print(f"No new stations found on page {page_number}. Stopping.")
            break

        previous_station_names = current_station_names.copy()
        page_number += 1

    if not bus_timings:
        print("Warning: No stations or timings found.")
    print(f"Final bus timings: {bus_timings}")
    return bus_timings

def find_closest_station(query, station_names):
    query = query.strip().lower()
    normalized_stations = [station.strip().lower() for station in station_names]
    
    closest_match = process.extractOne(query, normalized_stations)
    if closest_match and closest_match[1] >= 80:
        return station_names[normalized_stations.index(closest_match[0])]
    return None

def get_next_bus_time(bus_timings, station_name, user_time):
    user_time_dt = datetime.strptime(user_time, '%I:%M %p')

    if station_name in bus_timings:
        available_times = sorted(datetime.strptime(timing, '%I:%M %p') for timing in bus_timings[station_name])
        
        # Check for next bus time on the same day
        for bus_time in available_times:
            if bus_time > user_time_dt:
                return bus_time.strftime('%I:%M %p')

        # If no bus is available on the same day, check the next day
        next_day_time = user_time_dt + timedelta(days=1)
        for bus_time in available_times:
            if bus_time >= next_day_time:
                return bus_time.strftime('%I:%M %p')

    return None
def get_time_input():
    while True:
        user_time = input("Do you want to use the current time? (yes/no): ").strip().lower()
        if user_time == 'yes':
            return datetime.now().strftime('%I:%M %p')
        elif user_time == 'no':
            while True:
                manual_time = input("Enter a time (e.g., '2:30 PM') to find the next bus: ")
                try:
                    datetime.strptime(manual_time, '%I:%M %p')
                    return manual_time
                except ValueError:
                    print("Invalid time format. Please use 'HH:MM AM/PM' format (e.g., '2:30 PM').")
        else:
            print("Please respond with 'yes' or 'no'.")

def main():
    base_html = fetch_html(base_url)
    bus_stops = extract_bus_stops(base_html)

    start_point, end_point, bus_numbers = find_bus_number()  # Implement this function to get user inputs

    valid_bus_numbers = set()
    for bus in sorted(bus_numbers):
        print(f"Checking bus number: {bus}")
        if check_bus_route(bus):  # Assuming this function checks bus route connectivity
            valid_bus_numbers.add(bus)

    print("\nValid Bus Numbers:")
    for bus in sorted(valid_bus_numbers):
        print(bus)

    if valid_bus_numbers:
        bus_route_number = input("Enter the bus route number: ").strip().lower()
        bus_url = f"https://coimbatore.citybus.co.in/?s={bus_route_number}"
        route_links = extract_route_links(bus_url)

        if route_links:
            print("Available destinations for this route:")
            for destination in route_links:
                print(f"- {destination}")

            all_stations_and_timings = set()

            for route_link in route_links.values():
                bus_timings = fetch_route_map(route_link)

                print(f"\nFetching route from: {route_link}")
                print(f"Station Names: {bus_timings.keys()}")
                print(f"Timings: {bus_timings.values()}")

                for station, timings in bus_timings.items():
                    for timing in timings:
                        all_stations_and_timings.add((station, timing))

            print("\nAll Stations and Timings from all links:")
            for station, timing in all_stations_and_timings:
                print(f"{station.title()}: {timing}")

            normalized_station_names = [station.strip().lower() for station, _ in all_stations_and_timings]

            closest_start = find_closest_station(start_point.strip().lower(), normalized_station_names)
            closest_end = find_closest_station(end_point.strip().lower(), normalized_station_names)

            if closest_start and closest_end:
                start_index = normalized_station_names.index(closest_start)
                end_index = normalized_station_names.index(closest_end)

                if start_index < end_index:
                    print(f"Fetching timings between {closest_start.title()} and {closest_end.title()}...")
                    for i in range(start_index, end_index + 1):
                        print(f"{list(all_stations_and_timings)[i][0].title()}: {list(all_stations_and_timings)[i][1]}")
                else:
                    print(f"Invalid range! Starting point '{closest_start.title()}' must be before ending point '{closest_end.title()}'.")
                
                user_time = get_time_input()

                if closest_start:
                    next_bus = get_next_bus_time(bus_timings, closest_start, user_time)
                    if next_bus:
                        print(f"The next bus at {closest_start.title()} after {user_time} is at {next_bus}.")
                    else:
                        print(f"No buses available at {closest_start.title()} after {user_time}.")
                else:
                    print("Starting point not found in the station list.")
            else:
                print("One or both points not found in the station list.")
        else:
            print("No route links found for the specified bus route.")
    else:
        print("No valid bus numbers found.")

if __name__ == "__main__":
    main()
