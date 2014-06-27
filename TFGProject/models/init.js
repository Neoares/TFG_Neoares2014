/*
 * This file contains the information added to the player when it's created.
 */
exports.init = {
		res:[
			        {  
				       	name: 'Sawmill',
				    	scalingValue: 1.5,
				    	costs: {wood: 60, stone: 15, iron: 0, cereal: 0},
				    	id: '0'
			    	},
			    	
			    	{  
					    name: 'Stone Mine',
					    scalingValue: 1.6,
					    costs: {wood: 48, stone: 24, iron: 0, cereal: 0},
					    id: '1'
				    },
			    	{  
					    name: 'Foundry',
					    scalingValue: 1.5,
					    costs: {wood: 255, stone: 75, iron: 0, cereal: 0},
					    id: '2'
				    },
				    {  
					    name: 'Cereal Mill',
					    scalingValue: 1.5,
					    costs: {wood: 255, stone: 75, iron: 0},
					    id: '3'
				    }
		],
		buildings:[
			        {  
				       	name: 'Ed1',
				    	scalingValue: 2,
				    	costs: {wood: 1000, stone: 500, iron: 0},
				    	id: '100'
			    	},
			    	
			    	{  
					    name: 'Ed2',
					    scalingValue: 2,
					    costs: {wood: 1000, stone: 500, iron: 0},
					    id: '101'
				    },
				    {  
					    name: 'Ed3',
					    scalingValue: 2,
					    costs: {wood: 1000, stone: 0, iron: 1000},
					    id: '102'
				    },
				    {  
					    name: 'Edificio de prueba',
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
		  ],
		  mercenaries:[
				        {
							name: 'Soldier',
							costs: {wood: 20, stone: 10, iron: 0},	
							stats: {hp: 2000,shield: 20,attack: 80, speed: 10000},
							barracksLevel: 1,
							id: '300'
						},
						{
							name: 'Archer',
							costs: {wood: 25, stone: 5, iron: 0},
							stats: {hp: 2000,shield: 25,attack: 100, speed: 15000},
							barracksLevel: 1,
							id: '301',
						},
						{
							name: 'Knight',
							costs: {wood: 200, stone: 100, iron: 200},
							stats: {hp: 8000,shield: 100,attack: 250, speed: 8000},
							barracksLevel: 3,
							id: '302'
						},
						{
							name: 'Paladin',
							quantity: 2,
							costs: {wood: 200, stone: 200, iron: 800},
							stats: {hp: 8000,shield: 500,attack: 150, speed: 10000},
							barracksLevel: 5,
							id: '303'
						}
			  ],
};