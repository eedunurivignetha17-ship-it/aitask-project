
from flask import Blueprint, request, jsonify
import requests
import os
ai_bp = Blueprint("ai", __name__)

# PUT YOUR REAL OPENROUTER API KEY HERE

OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY")

print("API KEY:", OPENROUTER_API_KEY)


@ai_bp.route("/ai", methods=["POST"])
def ai_route():

    try:

        data = request.get_json()

        user_message = data.get("message")

        response = requests.post(

            "https://openrouter.ai/api/v1/chat/completions",

            headers={

                "Authorization": f"Bearer {OPENROUTER_API_KEY}",

                "Content-Type": "application/json"

            },

            json={

                "model": "openai/gpt-3.5-turbo",

                "messages": [
                    {
                        "role": "user",
                        "content": user_message
                    }
                ]

            }

        )

        result = response.json()

        print(result)

        if "choices" in result:

            reply = result["choices"][0]["message"]["content"]

            return jsonify({
                "reply": reply
            })

        else:

            return jsonify({
                "reply": f"OpenRouter Error: {result}"
            })

    except Exception as e:

        return jsonify({
            "reply": str(e)
        })