import requests
from bs4 import BeautifulSoup
import urllib.parse

# Get user input for the departure and destination locations

# Normalize the location names to handle spaces and special characters
def normalize_location(location):
    location = location.lower()
    print(location)
    location = location.replace(" ", "%20")  # Replace spaces with hyphens
    location = location.replace("-", "%20")  # Remove any single quotes
    return location
    # return urllib.parse.quote(location)

# Encode the departure and destination locations

# Create the URL based on user input

# Define headers to mimic a browser
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
 }

# Function to check if the URL exists (HTTP status 200)
def check_url_exists(url):
    response = requests.get(url, headers=headers)
    return response.status_code == 200
def find_bus_number():
 from_location = input("Enter the departure location (e.g., Puliakulam): ").strip()
 to_location = input("Enter the destination location (e.g., Gandhipuram): ").strip()
 from_location_encoded = normalize_location(from_location)
 to_location_encoded = normalize_location(to_location)
 url = f'https://way2cbe.com/buses-from-{from_location_encoded}-to-{to_location_encoded}'

 print(url)

# Check if the constructed URL exists
 if check_url_exists(url):
    # Send a GET request to the webpage with headers
    response = requests.get(url, headers=headers)

    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find the section that contains the bus numbers (class="col-12 col-md-8")
    bus_table = soup.find('div', class_='col-12 col-md-8')
    
    # Initialize a list to store bus numbers
    bus_numbers = []

    # Check if the bus table is found
    if bus_table:
        # Extract rows from the table
        bus_rows = bus_table.find_all('tr')

        # Loop through each row to extract bus numbers
        for row in bus_rows:
            columns = row.find_all('td')
            if len(columns) > 1:  # Make sure it has both bus number and destination
                bus_number = columns[0].text.strip()  # Get the bus number
                bus_numbers.append(bus_number)  # Add bus number to the list

    # Display the list of bus numbers
    if bus_numbers:
        s=f"List of Bus Numbers from {from_location} to {to_location}: {bus_numbers}"
        print(s)
    else:
        print("No bus information found.")
 else:
    print(f"Failed to retrieve the webpage. The page might not exist. URL: {url}")
 return from_location,to_location,bus_numbers
