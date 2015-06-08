

export class Contracts{
	//host = "http://localhost:8888"
	host = "http://scala-contracts-server.appspot.com"
	echoExContr(exContr) {
		var req = new Request(this.host+'/api/v1/echoexcontr', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'	
			},
			body: JSON.stringify(exContr)
		});
		return Zone.bindPromiseFn(fetch)(req) 
	}
	getLatticeJson(exContr) {
		var req = new Request(this.host+'/api/v1/lattice', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'	
			},
			body: JSON.stringify(exContr)
		});
		return Zone.bindPromiseFn(fetch)(req) 
	}	getLatticeImage(exContr) {
		var req = new Request(this.host+'/api/v1/dot', {
			method: 'POST',
			headers: {
				'Accept': 'text/plain',
				'Content-Type': 'application/json'	
			},
			body: JSON.stringify(exContr)
		});
		return Zone.bindPromiseFn(fetch)(req) 
	}
	getExpectedValueChart(exContr) {
		var req = new Request(this.host+'/api/v1/expvalchart', {
			method: 'POST',
			headers: {
				'Accept': 'text/plain',
				'Content-Type': 'application/json'	
			},
			body: JSON.stringify(exContr)
		});
		return Zone.bindPromiseFn(fetch)(req) 
	}
}