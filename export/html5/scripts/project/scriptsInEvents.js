


const scriptsInEvents = {

	async ["Event-Blatt1_Event10_Act1"](runtime, localVars)
	{
		async function fetchQuestTypesFromChangesets() {
			const url = "https://wielandbreitfeld.de/assets/proxy/osm-proxy.php";
		
			const diffDataFetch = await fetch(url);
			const diffData = await diffDataFetch.text();
		
		    // Extract all unique changeset numbers
		    const changesetRegex = /changeset="(\d+)"/g;
		    const uniqueChangesets = new Set();
		    let match;
		
		    while ((match = changesetRegex.exec(diffData)) !== null) {
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
		
		function getRandomInt(max) {
		  return Math.floor(Math.random() * max);
		}
		
		const delay = ms => new Promise(res => setTimeout(res, ms));
		
		
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
			questInst.isVisible = false;
			} 
		
		});
		
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

