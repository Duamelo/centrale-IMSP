var fs = require('fs');
var csv = require('csv-parser')

fs.createReadStream('capteur.csv', 'utf-8')
    .on('data', (row) =>  {

        var data = row.split("\n");
        //console.log(data);
        
        /*n_capteur = data[0];
        desc = data[1];
        console.log(n_capteur, desc);*/

        data.map( (line, index) =>{
           
            if(index >=2)
            {
                console.log(line, index);
                l = line.split(',');
                console.log(l);
            }
        })
      

    })
    .on('end', ()=> {
        console.log('CSV file successfully processed');
    });

    /*
let i = 0;

fs.createReadStream('capteur.csv')
.pipe(csv())
.on('data', (row) => {
    let nom_capteur, description;
    if (i == 0)
    {
        nom_capteur = row.capteur;
        description = row.description;
        console.log( nom_capteur, description);
    }


    sortie = row.sortie;
    unite = row.unite;
    v_min = row.valeur_min;
    v_max = row.valeur_max;
    n_capteur = row.nom_capteur;
    console.log(sortie, unite, v_max, v_min, n_capteur);
    i++;
})
.on('end', ()=> {
    console.log('CSV file successfully processed');
    console.log(i);
})
*/