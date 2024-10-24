import requests
import time
from seleniumbase import SB, BaseCase
from selenium.webdriver.chrome.webdriver import WebDriver as InnerDriver
import random
import json
import atexit
import os
import flask

class PriceComparator:
    CHECK_SEARCH_RESULTS = 1

    def __init__(self):
        self.sb = SB(uc=True, headed=True, page_load_strategy='none')
        self.driver: BaseCase = self.sb.__enter__()
    
    def _search_results(self, q):
        self.driver.get(f"https://www.google.com/search?q={q}")

        while not self.driver.execute_script('''return ((document.readyState == "interactive") || (document.readyState == "complete"))'''):
            time.sleep(0.1)
        
        query = self.driver.execute_script("return document.body.innerText;").replace('\n', '')

        for url in self.driver.execute_script('''var urls = [];document.querySelectorAll('span[jscontroller] > a').forEach(res => {urls.push(res.href)});return urls;''')[:self.CHECK_SEARCH_RESULTS]:
            while True:
                try:
                    self.driver.get(url)
                except:
                    self.driver.switch_to_default_content()
                    self.driver.switch_to_default_window()
                else:
                    break
            
            st = time.time()
            while (time.time() - st) < 1:
                try:
                    query += self.driver.execute_script("return document.body.innerText;").replace('\n', '')
                except:
                    pass
                else:
                    break
        return query

    def _black_box_req(self, req: list[dict]):
        print("Started the black box request.")
        _id = ''.join(random.sample("qwertyuiopasdfghjklzxcvbnm1234567890", k=7))
        _sys_id = ''.join(random.sample("qwertyuiopasdfghjklzxcvbnm1234567890", k=7))
        [r.update({"id": _id if r["role"] == "user" else _sys_id}) for r in req]
        return requests.post("https://www.blackbox.ai/api/chat", json={
            "messages": req,
            "id": _id,
            "previewToken": None,
            "userId": None,
            "codeModelMode": True,
            "agentMode": {},
            "trendingAgentMode": {},
            "isMicMode": False,
            "userSystemPrompt": None,
            "maxTokens": 8192,
            "playgroundTopP": 0.9,
            "playgroundTemperature": 0.5,
            "isChromeExt": False,
            "githubToken": None,
            "clickedAnswer2": False,
            "clickedAnswer3": False,
            "clickedForceWebSearch": False,
            "visitFromDelta": False,
            "mobileClient": False,
            "userSelectedModel": "gpt-4o"
        })

    def __exit__(self, *args, **kwargs):
        self.sb.__exit__(*args, **kwargs)
    
    def __del__(self):
        self.sb.__exit__(None, None, None)
    
    def compare(self, p):
        res = self._black_box_req([
            {
                "role": "user",
                "content": "given a product or service and a google search result, respond only in json format, also make sure that the prices also only a currency amount as description should be withheld for the pros and cons section, no two prices should be the same for the same site, the companies must be metioned in the search results, example: [{'company': '1st company', 'pricies': ['₹123 for the pro', '₹785 for the super pro', '₹1892 for the enterprise'], 'pros': ['good thing', 'another good thing'], 'cons': ['bad thing', 'bad thing']}, {'company': '2nd company', 'pricies': ['₹345 avererage on the go', '₹819', '₹1123'], 'pros': ['good thing'], 'cons': ['bad thing', 'bad thing']}, {'company': '3rd company', 'pricies': ['28$', '52$', '90$'], 'pros': ['good thing', 'another good thing', 'yet another good thing'], 'cons': ['bad thing']}]"
            },
            {
                "role": "assistant",
                "content": "Understood given, proxy providers answer given will be: [{'company': '1st company', 'pricies': ['₹123 for the pro', '₹785 for the super pro', '₹1892 for the enterprise'], 'pros': ['good thing', 'another good thing'], 'cons': ['bad thing', 'bad thing']}, {'company': '2nd company', 'pricies': ['₹345 avererage on the go', '₹819', '₹1123'], 'pros': ['good thing'], 'cons': ['bad thing', 'bad thing']}, {'company': '3rd company', 'pricies': ['28$', '52$', '90$'], 'pros': ['good thing', 'another good thing', 'yet another good thing'], 'cons': ['bad thing']}]"
            },
            {
                "role": "user",
                "content": f"{p}, search result: {self._search_results(p)}"
            }
        ]).text

        print(res)

        res = res.replace('$@$v=undefined-rv1$@$', '').replace("```json", "").replace("```", "") # remove the markdown syntax

        return json.loads(res)
    
    def merits(self, req):
        res = self._black_box_req([
            {
                "role": "user",
                "content": "given a product or service and a google search result, the result should only be valid json, get me the merits of the product/potential product, the merit score should be 100 for example: {'merit_score': 83, 'max_merit_score': 100, 'desc': 'A very long description about how the company has been how it's past has been and how the product has changed and evolved through the ages as well as how the market share is currently how it's prospects are looking, or if the company does not exist how good the product Idea could be given the information that is provided about the idea, like how the product could capture a market which is not properly served as of current or how this idea would fail to get a grip.', 'exists': true, 'growth': 0.2, 'market_compition_status': 79, 'risks': ['one', 'two'], 'past': 'a very long description about how the companies offering of this product has changed over time from a price / market cap / finance perspective', 'current':'same as past but for the current economic situation regarding the project', 'future': 'some predictions for the finacial future'}"
            },
            {
                "role": "assistant",
                "content": "Understood, given a prompt the response will be: {'merit_score': 83, 'max_merit_score': 100, 'desc': 'A very long description about how the company has been how it's past has been and how the product has changed and evolved through the ages as well as how the market share is currently how it's prospects are looking, or if the company does not exist how good the product Idea could be given the information that is provided about the idea, like how the product could capture a market which is not properly served as of current or how this idea would fail to get a grip.', 'exists': true, 'growth': 0.2, 'market_compition_status': 79, 'risks': ['one', 'two'], 'past': 'a very long description about how the companies offering of this product has changed over time from a price / market cap / finance perspective', 'current':'same as past but for the current economic situation regarding the project', 'future': 'some predictions for the finacial future'}"
            },
            {
                "role": "user",
                "content": f'{req}, search result: {self._search_results(req)}'
            }
        ]).text

        print(res)

        res = res.replace('$@$v=undefined-rv1$@$', '').replace("```json", "").replace("```", "")
        return json.loads(res)

    def charts(self, req):
        res = self._black_box_req([
            {
                "role": "user",
                "content": "given a product or service and a google search result regarding the finicial fesability of the product or service, the result should only be valid json, get the a chart of the prices of the product is respect to the company specified, where the product might be a product idea in which case it is the chart of the current and past potential, for example: [{'price': 1}, {'price': 59}, {'price': 389, 'event': 'something big happened'}, {'price': 400}, {'price': 250}, {'price': 730, 'event': 'something a bit big happened'}, {'price': 870}, {'price': 987}, {'price': 1200, 'event':'explaination for the continous increase in price'}, {'price': 500, 'event': 'reason for the drastic decrease'}]"
            },
            {
                "role": "assistant",
                "content": "Understood, given a prompt the response will be: [{'price': 1}, {'price': 59}, {'price': 389, 'event': 'something big happened'}, {'price': 400}, {'price': 250}, {'price': 730, 'event': 'something a bit big happened'}, {'price': 870}, {'price': 987}, {'price': 1200, 'event':'explaination for the continous increase in price'}, {'price': 500, 'event': 'reason for the drastic decrease'}], I also understand that the chart could follow any progression and that it is not nessesary that the result needs to have the same progression and that the most important thing is accuracy, I will not including any information that is not absolutely accurate."
            },
            {
                "role": "user",
                "content": f"{req}, search result: {self._search_results(req)}"
            }
        ]).text

        print(res)

        res = res.replace('$@$v=undefined-rv1$@$', '').replace("```json", "").replace("```", "")

        return json.loads(res)

comparator = PriceComparator()

app = flask.Flask(__name__)

cache = {}

@app.route("/search")
def search():
    req = flask.request.args.get('q')

    if req in cache.keys():
        resp = cache[req]
    else:
        _resp = comparator.compare(req)
        for i in range(len(_resp)):
            _resp[i]["query"] = req
        resp = flask.Response(json.dumps(_resp))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        cache[req] = resp
        
    return resp

@app.route("/merits")
def merits():
    req = flask.request.args.get("q")

    if req in cache.keys():
        resp = cache[req]
    else:
        resp = flask.Response(json.dumps(comparator.merits(req)))
        resp.headers["Access-Control-Allow-Origin"] = "*"
        cache[req] = resp
    
    return resp

@app.route("/chart")
def chart():
    req = flask.request.args.get("q")

    if req in cache.keys():
        resp = cache[req]
    else:
        resp = flask.Response(json.dumps(comparator.charts(req)))
        resp.headers["Access-Control-Allow-Origin"] = "*"
        cache[req] = resp
    
    return resp

@atexit.register
def killall_uc_driver(*args, **kwargs):
    os.system("taskkill /f /t /im uc_driver.exe")

if __name__ == "__main__":
    app.run(port=3030)