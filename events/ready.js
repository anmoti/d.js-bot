const http = require("http");

module.exports = client => {
	console.log(`[Login]: ${client.user.tag}`);
	console.log(`[Login]: Time >> ${Date.now - client.cache.startDate}ms`);
  	client.user.setPresence({
    	activity: {
			name: `${client.config.prefix}help`, type: 'WATCHING'
		},
  		status: 'online' 
	});
};
