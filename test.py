import random
import requests

def _black_box_req(req):
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
        "userSelectedModel": None
    })

# res = _black_box_req([
#     {
#         "role": "user",
#         "content": "given a product or service and a google search result, respond only in json format, example: [{'company': '1st company', 'pricies': ['123$', '785$', '1892$'], 'pros': ['good thing', 'another good thing'], 'cons': ['bad thing', 'bad thing']}, {'company': '2nd company', 'pricies': ['345$', '819$', '1123$'], 'pros': ['good thing'], 'cons': ['bad thing', 'bad thing']}, {'company': '3rd company', 'pricies': ['28$', '52$', '90$'], 'pros': ['good thing', 'another good thing', 'yet another good thing'], 'cons': ['bad thing']}]"
#     },
#     {
#         "role": "assistant",
#         "content": "Understood given, proxy providers answer given will be: [{'company': '1st company', 'pricies': ['123$', '785$', '1892$'], 'pros': ['good thing', 'another good thing'], 'cons': ['bad thing', 'bad thing']}, {'company': '2nd company', 'pricies': ['345$', '819$', '1123$'], 'pros': ['good thing'], 'cons': ['bad thing', 'bad thing']}, {'company': '3rd company', 'pricies': ['28$', '52$', '90$'], 'pros': ['good thing', 'another good thing', 'yet another good thing'], 'cons': ['bad thing']}]"
#     },
#     {
#         "role": "user",
#         "content": "Proxy Server Providers, search result: Accessibility links\nSkip to main content\nAccessibility help\nAccessibility feedback\nFilters and topics\nAll\nImages\nVideos\nNews\nShopping\nWeb\nBooks\nMore\nTools\n\nTop Proxy Service Providers\nGeeksforGeeks\nhttps://www.geeksforgeeks.org › top-proxy-service-pro...\n8 Oct 2024 — Top Proxy Service Providers · 1. Bright Data · 2. Live Proxies · 3. Oxylabs · 4. Smartproxy · 5. Webshare.\n\nBest Proxy Sites & Servers | Best Proxies to Use in 2024\nGoLogin\nhttps://gologin.com › best-proxy-server-services\nLunaProxy is a leading proxy service provider, designed to offer seamless and unrestricted access to the internet. Service specializes in providing both ...\n\n10 Best Proxy Providers in 2024\nOxylabs\nhttps://oxylabs.io › blog › best-proxy-providers\n27 Sept 2024 — Awarded the Best Overall Proxy Provider in 2022 and Best Proxy Performance in 2023 by Proxyway, Oxylabs is considered to be one of the best and ...\n\nThe Best Proxy Servers for 2024\nPCMag\nhttps://www.pcmag.com › ... › Security › Proxies\nThe Best Proxy Servers for 2024 ; Best Overall. MarsProxies. 4.0 Excellent ; Best for Sneaker Drops. IPRoyal. 3.5 Good ; Best Speeds. Storm Proxies. 3.5 Good ; Best ...\n3.5\n · Review by Chris Stobing · ‎$1.75\n\nThe Best Proxy Servers of 2024\nSecurity.org\nhttps://www.security.org › vpn › best › proxy\n10 Oct 2024 — Detailed Information on the Best Proxy Servers of 2024. 1. NordVPN - Best Proxy for Torrenting. SecurityScore: 9.7 ...\n\nThe 9 Best Proxy Providers of 2024\nBright Data\nhttps://brightdata.com › blog › proxy-101 › best-proxy...\nBest Proxy Providers: Summary Table ; Smartproxy, Residential, datacenter, ISP, mobile, 65+ million, HTTP, HTTPS, SOCKS, 99.99% ; Oxylabs, Residential, datacenter ...\n‎What Is a Proxy Provider? · ‎What to Consider When... · ‎Oxylabs · ‎SOAX\nPeople also ask\nWhich proxy provider is best?\nWho provides the proxy server?\nWhat is the largest proxy provider?\nWhat is my proxy provider?\nFeedback\n\nThe Best Proxy Server Providers of 2024\nProxyway\nhttps://proxyway.com › Best\nThe Best Proxy Providers of 2024 · 1. Smartproxy · 2. Oxylabs · 3. Bright Data · 4. SOAX · 5. Webshare · 6. NetNut · 7. Infatica · 8. Rayobyte.\n\nBest Proxy Providers in 2024: Tested and Reviewed\nComparitech\nhttps://www.comparitech.com › Blog › VPN & Privacy\n9 Oct 2024 — With over 72 million IPs and a plethora of out-of-the-box solutions, Bright Data won our vote for the best proxy provider. While Oxylabs has ...\n\nTop 10 Proxy Server Providers of 2023 for Web Scraping\nAIMultiple\nhttps://research.aimultiple.com › proxy-providers\n9 Oct 2024 — IPRoyal is a proxy provider for various use cases such as web scraping, sneaker shopping, website testing and social media management. The proxy ...\n‎The Best proxy providers of 2024 · ‎Bright Data · ‎NetNut · ‎Smartproxy\n\nSmartproxy: Best Value Proxy Service Provider 2024 Winner\nSmartproxy\nhttps://smartproxy.com\nStart your journey with easy-to-use, high-quality, and affordable proxy servers, data collection, and extraction infrastructure.\n‎Proxy Servers · ‎Chrome Proxy Extension · ‎A residential proxy network · ‎Login\nPeople also search for\nFree proxy server providers\nBest proxy server providers\nProxy server providers for gaming\nProxy server providers ip address\nBest proxy server free\nBest proxy VPN\nProxy vendors list\nBest proxy server for gaming\nPage navigation\n\t\n1\t\n2\n\t\n3\n\t\n4\n\t\n5\n\t\n6\n\t\n7\n\t\n8\n\t\n9\n\t\n10\n\t\nNext\nFooter links\nIndia\nKattankulathur, Tamil Nadu - From your IP address\n - Update location"
#     },
# ])

# print(res.text)

response = requests.post("https://scrapeninja.p.rapidapi.com/scrape", json={
	"url": "https://www.google.com/search?q=Flights%20from%20MAA%20to%20DEL",
	"extractor": """function(input, cheerio) {
        let $ = cheerio.load(input);

        urls = [];

        $('span[jscontroller] > a').each((i, el) => {
            const href = $(el).attr('href');
            if (href){
                urls.push(absoluteUrl);
            }
        });
        
        $('script').remove();
        $('style').remove();
        $('noscript').remove();
        $('iframe').remove();
        $('head').remove();
        $('meta').remove();
        $('link').remove();
        $('svg').remove();

        return { contents: $('body').text(), urls: urls};
    }""",
}, headers={
	"x-rapidapi-key": "f2f2b1fad5mshc53cea1b1001845p183e96jsne9a31aada3a3",
	"x-rapidapi-host": "scrapeninja.p.rapidapi.com",
	"Content-Type": "application/json"
})

print(response.json())