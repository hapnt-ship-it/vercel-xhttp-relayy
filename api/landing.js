export const config = { runtime: "edge" };

const HTML_CONTENT = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vercel XHTTP Relay</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #fff;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        .container {
            max-width: 800px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            border: 1px solid rgba(255, 255, 255, 0.18);
        }
        h1 {
            font-size: 2.5rem;
            margin-bottom: 20px;
            text-align: center;
        }
        .status {
            background: rgba(46, 213, 115, 0.2);
            border: 1px solid rgba(46, 213, 115, 0.5);
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 30px;
            text-align: center;
        }
        .status-icon {
            font-size: 2rem;
            margin-bottom: 10px;
        }
        .info-box {
            background: rgba(255, 255, 255, 0.05);
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
        }
        .info-box h2 {
            font-size: 1.3rem;
            margin-bottom: 15px;
            color: #ffd700;
        }
        .info-box p {
            line-height: 1.6;
            margin-bottom: 10px;
        }
        .info-box code {
            background: rgba(0, 0, 0, 0.3);
            padding: 2px 8px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
        }
        .warning {
            background: rgba(255, 107, 107, 0.2);
            border: 1px solid rgba(255, 107, 107, 0.5);
            padding: 15px;
            border-radius: 10px;
            margin-top: 20px;
        }
        .warning strong {
            color: #ffd700;
        }
        a {
            color: #ffd700;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        footer {
            text-align: center;
            margin-top: 30px;
            opacity: 0.8;
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Vercel XHTTP Relay</h1>
        
        <div class="status">
            <div class="status-icon">✅</div>
            <strong>Relay is operational</strong>
        </div>

        <div class="info-box">
            <h2>📡 About This Service</h2>
            <p>
                This is an edge-runtime HTTP relay for XHTTP transport protocol, 
                deployed on Vercel's global edge network. It forwards traffic to a 
                configured backend server with minimal latency.
            </p>
        </div>

        <div class="info-box">
            <h2>🔧 How It Works</h2>
            <p>
                This relay uses Vercel's Edge Functions to stream requests bidirectionally 
                to your backend server. All traffic is handled at the edge with near-zero 
                cold start times (~5-50ms).
            </p>
            <p>
                The relay supports <code>XHTTP</code> transport protocol only and is designed 
                for use with Xray/V2Ray clients.
            </p>
        </div>

        <div class="info-box">
            <h2>⚡ Features</h2>
            <p>
                ✓ True bidirectional streaming via WebStreams<br>
                ✓ Lightning-fast cold starts in V8 isolates<br>
                ✓ Global edge distribution across all Vercel PoPs<br>
                ✓ Automatic header filtering and IP forwarding<br>
                ✓ Zero-configuration deployment
            </p>
        </div>

        <div class="warning">
            <strong>⚠️ Notice:</strong> This service is for authorized use only. 
            Make sure your usage complies with Vercel's Terms of Service and all 
            applicable laws in your jurisdiction.
        </div>

        <footer>
            <p>
                Powered by Vercel Edge Runtime | 
                <a href="https://github.com/hapnt-ship-it/vercel-xhttp-relayy" target="_blank">View on GitHub</a>
            </p>
        </footer>
    </div>

    <script>
        window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };
    </script>
    <script defer src="/_vercel/speed-insights/script.js"></script>
</body>
</html>`;

export default async function handler(req) {
  return new Response(HTML_CONTENT, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
