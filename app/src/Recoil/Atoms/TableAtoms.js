import {atom} from 'recoil';


export const tableAtom = atom({
    key: 'tableAtom',
    default: [
        {
            id: '1',
            position: {x: 100, y: 0},
            tableName: 'Table 1',
            type: "DBTable",
            columns: [
                {
                    id: 1,
                    columnName: "",
                    dataType: ["" , ""],
                    constraints: 
                        {
                            "NOT NULL": false,
                            "UNIQUE": false,
                            "INC": false,
                            "DEFAULT": null
                        },
                    pk: false,
                    foreignKey: [],
                }
            ],
        }
    ]
});
