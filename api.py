from google.cloud import vision
from flask import Flask, render_template_string
import io
import os
import google.generativeai as genai
from flask import request

app = Flask(__name__)
client = vision.ImageAnnotatorClient.from_service_account_json("apiKey.json")

img_path = "captured-image.jpg"
save_path = "output.html"

HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Label Detection</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
        h1 { color: #333; }
        ul { list-style: none; padding: 0; }
        li { background: #f4f4f4; margin: 5px; padding: 10px; border-radius: 5px; display: inline-block; }
    </style>
</head>
<body>
    <h1>Detected Content</h1>
    <ul>
        {% for item in content %}
            <li>{{ item }}</li>
        {% endfor %}
    </ul>
</body>
</html>
"""

@app.route('/')
def find_material(img_path=img_path, acc=0.80):
    with io.open(img_path, 'rb') as img_file:
        content = img_file.read()

    img = vision.Image(content=content)
    rep = client.label_detection(img)
    labels = [label.description for label in rep.label_annotations if label.score > acc]

    # Render HTML
    html_content = render_template_string(HTML_TEMPLATE, content=labels)

    # Save HTML
    with open(save_path, "w", encoding="utf-8") as file:
        file.write(html_content)

    return f"HTML file saved at: {save_path}"

# Run the app
if __name__ == "__main__":
    app.run(debug=True)
