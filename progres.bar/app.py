from flask import Flask, render_template_string
from datetime import datetime

app = Flask(__name__)

start_date = datetime(2025, 8, 10)
end_date = datetime(2025, 9, 22)
total_seconds = (end_date - start_date).total_seconds()

HTML_TEMPLATE = """
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Progress ketemu sayangg</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #1f1c2c, #928dab);
            color: white;
            text-align: center;
            padding-top: 50px;
            margin: 0;
        }
        h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }
        h3 {
            font-weight: 400;
            margin-bottom: 40px;
            color: #f0f0f0;
        }
        .bar-container {
            width: 80%;
            background-color: rgba(255, 255, 255, 0.1);
            margin: auto;
            border-radius: 25px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
        .bar {
            height: 30px;
            background: linear-gradient(90deg, #4facfe, #00f2fe);
            width: {{ percent }}%;
            transition: width 0.8s ease-in-out;
        }
        .time-info {
            margin-top: 20px;
            font-size: 1.2em;
        }
        .percent {
            font-size: 1.8em;
            font-weight: bold;
            margin-top: 10px;
            color: #ffd369;
        }
        footer {
            margin-top: 50px;
            font-size: 0.9em;
            color: rgba(255,255,255,0.6);
        }
    </style>
    <meta http-equiv="refresh" content="1">
</head>
<body>
    <h1>📅 Progress Periode</h1>
    <h3>{{ start }} → {{ end }}</h3>

    <div class="bar-container">
        <div class="bar"></div>
    </div>

    <div class="percent">{{ percent }}% selesai</div>

    <div class="time-info">
        ⏳ Waktu tersisa: {{ days }} hari, {{ hours }} jam, {{ minutes }} menit, {{ seconds }} detik
        <br>📍 Sekarang: {{ now }}
    </div>

    <footer>
        © 2025 Progress Tracker | Dibuat oleh rino febrian
    </footer>
</body>
</html>
"""

@app.route("/")
def home():
    now = datetime.now()
    elapsed_seconds = (now - start_date).total_seconds()

    if elapsed_seconds < 0:
        elapsed_seconds = 0
    elif elapsed_seconds > total_seconds:
        elapsed_seconds = total_seconds

    percent = round((elapsed_seconds / total_seconds) * 100, 2)
    remaining_seconds = total_seconds - elapsed_seconds
    days = int(remaining_seconds // 86400)
    hours = int((remaining_seconds % 86400) // 3600)
    minutes = int((remaining_seconds % 3600) // 60)
    seconds = int(remaining_seconds % 60)

    return render_template_string(
        HTML_TEMPLATE,
        start=start_date.strftime("%d %B %Y"),
        end=end_date.strftime("%d %B %Y"),
        percent=percent,
        days=days,
        hours=hours,
        minutes=minutes,
        seconds=seconds,
        now=now.strftime("%d %B %Y %H:%M:%S")
    )

if __name__ == "__main__":
    app.run(debug=True)
