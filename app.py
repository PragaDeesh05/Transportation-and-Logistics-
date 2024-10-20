from flask import Flask, request, jsonify, render_template
from Bus_number import find_bus_number
from Next_bus import fetch_route_map, extract_route_links, get_next_bus_time,get_time_input

app = Flask(_name_)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/track-bus', methods=['POST'])
def track_bus():
    data = request.json  # Get the JSON data from the request
    start_location = data.get('startLocation')
    destination = data.get('destination')

    if not start_location or not destination:
        return jsonify({'error': 'Missing startLocation or destination'}), 400

    from_location, to_location, bus_numbers = find_bus_number(start_location, destination)
    return jsonify({'busNumbers': bus_numbers})
@app.route('/next-bus', methods=['POST'])
def next_bus():
    bus_number = request.form['busNumber']
    start_location = request.form['startLocation']
    destination = request.form['destination']

    bus_url = f"https://coimbatore.citybus.co.in/?s={bus_number}"
    route_links = extract_route_links(bus_url)

    if route_links:
        all_stations_and_timings = {}
        for route_link in route_links.values():
            bus_timings = fetch_route_map(route_link)
            all_stations_and_timings.update(bus_timings)

        user_time = get_time_input()  # Modify as needed
        next_bus_time = get_next_bus_time(all_stations_and_timings, start_location, user_time)

        if next_bus_time:
            return f"The next bus from {start_location} is at {next_bus_time}."
        else:
            return f"No buses available from {start_location} after {user_time}."
    else:
        return "No route links found for the specified bus number."

if _name_ == "_main_":
    app.run(debug=True)
