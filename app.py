from flask import Flask, render_template, request
import math

app = Flask(__name__)

def approximate_pi(num_sides):
    a = math.pi / num_sides
    pi_circumscribed = num_sides * math.tan(a)
    pi_inscribed = num_sides * math.sin(a)
    pi_average = (pi_circumscribed + pi_inscribed) / 2

    return pi_inscribed, pi_circumscribed, pi_average

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        num_sides = int(request.form.get('numSides', 6))  # Set default value to 8
    else:
        num_sides = 6  # Default value

    inscribed_pi, circumscribed_pi, average_pi = approximate_pi(num_sides)
    actual_pi = math.pi

    return render_template('index.html', num_sides=num_sides, inscribed_pi=inscribed_pi,
                           circumscribed_pi=circumscribed_pi, average_pi=average_pi, actual_pi=actual_pi)

if __name__ == "__main__":
    app.run(debug=True)
