/*
 * This file contains the information added to the player when it's created.
 */
exports.init = {
		res:[
			        {  
				       	name: 'Sawmill',
				    	level: 0,
				    	scalingValue: 1.5,
				    	costs: {wood: 60, stone: 15, iron: 0, cereal: 0},
				    	id: '0'
			    	},
			    	
			    	{  
					    name: 'Iron Mine',
					    level: 0,
					    scalingValue: 1.6,
					    costs: {wood: 48, stone: 24, iron: 0, cereal: 0},
					    id: '1'
				    },
			    	{  
					    name: 'Foundry',
					    level: 0,
					    scalingValue: 1.5,
					    costs: {wood: 255, stone: 75, iron: 0, cereal: 0},
					    id: '2'
				    },
				    {  
					    name: 'Cereal Mill',
					    level: 0,
					    scalingValue: 1.5,
					    costs: {wood: 255, stone: 75, iron: 0},
					    id: '3'
				    }
		],
		buildings:[
			        {  
				       	name: 'Ed1',
				    	level: 0,
				    	scalingValue: 2,
				    	costs: {wood: 1000, stone: 500, iron: 0},
				    	id: '100'
			    	},
			    	
			    	{  
					    name: 'Ed2',
					    level: 0,
					    scalingValue: 2,
					    costs: {wood: 1000, stone: 500, iron: 0},
					    id: '101'
				    },
				    {  
					    name: 'Ed3',
					    level: 0,
					    scalingValue: 2,
					    costs: {wood: 1000, stone: 0, iron: 1000},
					    id: '102'
				    },
				    {  
					    name: 'Edificio de prueba',
					    level: 0,
					    scalingValue: 2,
					    costs: {wood: 10, stone: 10, iron: 0},
					    id: '103'
				    }
			],
			researches:[
			        {
						name: 'research1',
						level: 0,
						scalingValue: 2,
						costs: {wood: 200, stone: 100, iron: 400},
						id: '200'
					},
					{
						name: 'research2',
						level: 0,
						scalingValue: 2,
						costs: {wood: 400, stone: 200, iron: 800},
						id: '201'
					}
		  ]
};