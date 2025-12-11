# -*- coding: utf-8 -*-
import requests
import json

url = "http://proxy.moonshot.sys.ctripcorp.com/v1/chat/completions"
headers = {
    "Authorization": "Bearer sk-17b88661-bd36-4fdb-82b6-f3ba309eb30b",
    "Accept": "application/json",
    "Content-Type": "application/json"
}

data = {
    "messages": [
        {
            "role": "system",
            "content": "You are a helpful assistant"
        },
        {
            "role": "user",
            "content": "世界第一高山是什么？"
        }
    ],
    "stream": True,
    "model": "kimi-k2-thinking",
    "frequency_penalty": 0,
    "top_p": 1,
    "temperature": 1
}

response = requests.post(url, headers=headers, json=data, stream=True)

for line in response.iter_lines():
    if line:
        line_str = line.decode('utf-8')
        if line_str.startswith('data: '):
            line_str = line_str[6:]  
            if line_str.strip() == '[DONE]':
                break
            try:
                chunk_data = json.loads(line_str)
                if 'choices' in chunk_data and len(chunk_data['choices']) > 0:
                    delta = chunk_data['choices'][0].get('delta', {})
                    if 'content' in delta and delta['content'] is not None:
                        print(delta['content'], end="")
            except json.JSONDecodeError:
                continue
