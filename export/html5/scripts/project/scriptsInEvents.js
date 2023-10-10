


const scriptsInEvents = {

	async ["Event-Blatt1_Event10_Act1"](runtime, localVars)
	{
		async function fetchQuestTypesFromChangesets() {
		    // Fetch the state.txt and extract sequenceNumber
		    const response = await fetch('https://planet.openstreetmap.org/replication/minute/state.txt');
		    const text = await response.text();
		    const sequenceNumber = text.split('\n')[1].split('=')[1];
		
		    // Convert sequence number to the desired format
		    const paddedSequenceNumber = sequenceNumber.padStart(9, '0');
		    const url = `https://planet.openstreetmap.org/replication/minute/${paddedSequenceNumber.slice(0,3)}/${paddedSequenceNumber.slice(3,6)}/${paddedSequenceNumber.slice(6,9)}.osc.gz`;
		
		    // Fetch the .gz file
		    const responseGz = await fetch(url);
		    const arrayBuffer = await responseGz.arrayBuffer();
		
		    // Decompress using pako
		    const decompressedData = pako.inflate(arrayBuffer, { to: 'string' });
		
		    // Extract all unique changeset numbers
		    const changesetRegex = /changeset="(\d+)"/g;
		    const uniqueChangesets = new Set();
		    let match;
		
		    while ((match = changesetRegex.exec(decompressedData)) !== null) {
		        uniqueChangesets.add(match[1]);
		    }
		
		    const questTypeCounts = {};
		
		    for (let changeset of uniqueChangesets) {
		        const changesetResponse = await fetch(`https://api.openstreetmap.org/api/0.6/changeset/${changeset}`);
		        const changesetData = await changesetResponse.text();
		
		        const questTypeMatch = /<tag k="StreetComplete:quest_type" v="([^"]+)"/.exec(changesetData);
		        const changesCountMatch = /changes_count="(\d+)"/.exec(changesetData);
		
		        if (questTypeMatch && changesCountMatch) {
		            const questType = questTypeMatch[1];
		            const changesCount = parseInt(changesCountMatch[1], 10);
		
		            questTypeCounts[questType] = (questTypeCounts[questType] || 0) + changesCount;
		        }
		    }
		
		    const result = Object.entries(questTypeCounts).map(([type, count]) => [type, count]);
		
		    return result;
		}
		
		
		async function loadScript(url) {
		  let response = await fetch(url);
		  let script = await response.text();
		  eval(script);
		}
		
		function getRandomInt(max) {
		  return Math.floor(Math.random() * max);
		}
		
		const delay = ms => new Promise(res => setTimeout(res, ms));
		
		if (runtime.gameTime < 1) {
			 loadScript("https://cdnjs.cloudflare.com/ajax/libs/pako/2.0.3/pako.min.js");
		} 
		
		
		fetchQuestTypesFromChangesets().then(questTypes => {
		    //console.log(questTypes);
			for (const x of questTypes)
			{
			let mX = getRandomInt(1850);
			let mY = -50 - getRandomInt(300) * (x[1] * 0.5) ;
			let questInst = runtime.objects.Quest.createInstance(0, mX, mY);
			questInst.instVars.age = 0 - getRandomInt(19);
			questInst.instVars.QuestName = x[0];
			questInst.instVars.anzahl = x[1];
			} 
		
		});
		
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

