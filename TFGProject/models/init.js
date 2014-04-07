/*
 * This file contains the information added to the player when it's created.
 */
exports.init = {
		res:[
			        {  
				       	name: 'Sawmill',
				    	level: 0,
				    	scalingValue: 2,
				    	costs: {wood: 1000, stone: 500, iron: 0},
				    	type: 1
			    	},
			    	
			    	{  
					    name: 'Aserradero',
					    level: 0,
					    scalingValue: 2,
					    costs: {wood: 1000, stone: 500, iron: 0},
					    type: 1
				    }
		],
		buildings:[
			        {  
				       	name: 'Ed1',
				    	level: 0,
				    	scalingValue: 2,
				    	costs: {wood: 1000, stone: 500, iron: 0},
			    	},
			    	
			    	{  
					    name: 'Ed2',
					    level: 0,
					    scalingValue: 2,
					    costs: {wood: 1000, stone: 500, iron: 0},
				    },
				    {  
					    name: 'Ed2',
					    level: 0,
					    scalingValue: 2,
					    costs: {wood: 1000, stone: 0, iron: 1000},
				    }
			],
			researches:[
			        {
						name: 'research1',
						level: 0,
						scalingValue: 2,
						costs: {wood: 200, stone: 100, iron: 400}
					},
					{
						name: 'research2',
						level: 0,
						scalingValue: 2,
						costs: {wood: 400, stone: 200, iron: 800}
					}
		  ]
};