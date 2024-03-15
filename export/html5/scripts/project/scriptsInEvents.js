


const scriptsInEvents = {

	async ["Event-Blatt1_Event11_Act1"](runtime, localVars)
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
		
		    const questTypeCounts = [];
		
		    for (let changeset of uniqueChangesets) {
		        const changesetResponse = await fetch(`https://api.openstreetmap.org/api/0.6/changeset/${changeset}`);
		        const changesetData = await changesetResponse.text();
		
		        const questTypeMatch = /<tag k="StreetComplete:quest_type" v="([^"]+)"/.exec(changesetData);
		        const changesCountMatch = /changes_count="(\d+)"/.exec(changesetData);
				const userMatch = /user="([^"]+)"/.exec(changesetData); // Regex to extract user
				var changesetIDMatch =  /id="(\d+)"/.exec(changesetData);
		
		
		        if (questTypeMatch && changesCountMatch) {
		            var questType = questTypeMatch[1];
		            var changesCount = parseInt(changesCountMatch[1], 10);
					var user = userMatch[1]; // Extracted user
					var changesetID =  changesetIDMatch[1];
					console.log(changesetIDMatch[1]);
		
		
		            questTypeCounts.push({"changesCount": changesCount, "questType": questType, "user": user, "changesetID": changesetID});
		        }
		    }
		
		    return questTypeCounts;
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
			let mY = -50 - getRandomInt(300) * (x["changesCount"] * 0.5) ;
			let questInst = runtime.objects.Quest.createInstance(0, mX, mY);
			questInst.instVars.age = 0 - getRandomInt(19);
			questInst.instVars.QuestName = x["questType"];
			questInst.instVars.anzahl = x["changesCount"];
			questInst.instVars.changeSetID =  String(x["changesetID"]);
			questInst.instVars.user = x["user"];
			questInst.isVisible = false;
			} 
		
		});
		
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

