module.exports = {
	name: ["!essadapter", "!essa", "!adapter"],
	description: "Provides an explaination for what an ESS Adapter does.",
	isChatCommand: true,
	debug: false,
	rate: 1000 * 30,
	tags: ["useful", "information"],
	load: function(addObj)
	{
		for (var i in addObj)
		{
			if (this.debug)
				console.log("\t + Loading addon:", i);
			this[i] = addObj[i];
		}
	},
	callback: function(msgObj)
	{
		var now = new Date();
		if (typeof this.last === "undefined")
			this.last = new Date(now.getTime() - this.rate);
		var diff = now.getTime() - this.last.getTime();
		if (diff >= this.rate)
		{
			this.last = now;
			var args = msgObj.text.explode(" ", 2);
			if (args[1] != "" && args[1].indexOf("@") != 0)
				args[1] = "@" + args[1];
			else if (args[1] == "")
				args[1] = "@" + msgObj.display_name;
			this.sendMessage(msgObj.channel, args[1] + " The ESS adapter changes the control stick mapping to be similar to the one on N64, which makes movement/aiming better and in particular makes ESS way easier.");
		}
	}
};