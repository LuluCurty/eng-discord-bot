/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// export default {
	// async fetch(request, env, ctx) {
		// return new Response('Hello World!');
	// },
// };


import { verifyKey } from 'discord-interactions';
import {randomEmoji} from '../commands/simple'

const PUBLIC_KEY =   globalThis.PUBLIC_KEY

export default{
	async fetch(request) {
		const signature = request.headers.get('x-signature-ed25519')
		const timestamp = request.headers.get('x-signature-timestamp')
		const body = await request.text();

		const isValid = verifyKey(body, signature, timestamp, PUBLIC_KEY);
		if (!isValid) {
			return new Response('Bad request signature.', {status: 401});
		}


		// Ping = usado pelo Discord pra validar o endpoint
		const json = JSON.parse(body)
		if (json.type === 1) {
     		return new Response(JSON.stringify({ type: 1 }), {
        		headers: { 'Content-Type': 'application/json' },
      		});
   		}

		if (json.data.name === 'test1') {
			return new Response(
				JSON.stringify({
					type: 4,
					data: {
						content: `Funciona ${randomEmoji}`,
					},
				}),
				{ headers: {'Content-Type': 'application/json'}}
			)
		}

		
		return new Response('Unknow command', {status: 400})
	}
}
