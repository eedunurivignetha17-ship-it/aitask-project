import os
import urllib.request
import json

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

def get_ai_response(user_message):

    try:

        url = "https://openrouter.ai/api/v1/chat/completions"

        headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json"
        }

        data = {
            "model": "openai/gpt-3.5-turbo",
            "messages": [
                {
                    "role": "user",
                    "content": user_message
                }
            ]
        }

        req = urllib.request.Request(
            url,
            data=json.dumps(data).encode("utf-8"),
            headers=headers,
            method="POST"
        )

        with urllib.request.urlopen(req) as response:

            result = json.loads(response.read().decode())

            return result["choices"][0]["message"]["content"]

    except Exception as e:
        return f"Error: {str(e)}"