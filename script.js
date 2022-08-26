const select = document.querySelector('select');
let res= []
// document.querySelector('button').addEventListener('click', getFetch)


    //const choice = document.querySelector('input').value
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0/'

    fetch(url)
    .then(res=>res.json())
    .then(data =>{
         res = data.results
         console.log(res);


         res.forEach((item)=>{

            let option = document.createElement("option");
            option.innerText = item.name;
            select.appendChild(option);
                
    
          })
          select.addEventListener('change', event=>{

            let urlData=event.target.value 
           
            console.log(urlData);
           
            let url=`https://pokeapi.co/api/v2/pokemon/${urlData}/`
            fetch(url)
                .then(res=>{
                    return res.json();
                })
                .then(data=>{
                    // console.log(data.sprites.other.dream_world.front_default);
                    // document.querySelector('img').src=data.sprites.other.dream_world.front_default
                    console.log(data);

                    const potentialPet = new Poke (data.name, data.height ,data.weight, data.types, data.sprites.other.dream_world.front_default)

                    potentialPet.getTypes()
                    potentialPet.isItHousePet()
                    let decision=''
                    if(potentialPet.housepet){
                        decision='This pokemon is small enough, light enough and safe enough to be a good pet!'
                    }else{
                        decision=`This pokemon would not be a good house pet because ${potentialPet.reason.join(' ')}.`
                    }

                    document.querySelector('h2').innerText = decision

                    document.querySelector('img').src=potentialPet.image
                
                })       
          })
    })
    .catch(err=>{
        console.log(`error ${err}`);
    })

    // document.querySelector('button').addEventListener('click', getimg(){
        
    // })
class Poke{
    constructor(name, height, weight, types, image){
        this.name=name
        this.height=height
        this.weight=weight
        this.types=types
        this.image=image
        this.housepet= true
        this.reason=[]
        this.typeList = []

    }
    getTypes(){
        for(const property of this.types){
            this.typeList.push(property.type.name)
        }
        
        document.querySelector('.type').innerText= `Type: ${this.typeList.join(' and ')}
`    }
    // getImg(){
    //     document.querySelector('img').src=this.image
    // }
    weightToKg(weight){
        document.querySelector('.weight').innerText= `${weight} kg`
        return weight/2
    }
    heightToM(height){
        document.querySelector('.height').innerText= `${height}m`
        return height/10
    }
    isItHousePet(){
        let badTypes=[ 'fire', 'electric', 'fighting', 'poison', 'ghost']

        if(this.weightToKg(this.weight)>200){
            this.reason.push(`its too heavy at ${this.weightToKg(this.weight)}kg` )
            this.housepet=false
        }
        if(this.heightToM(this.height)>3){
            this.reason.push(`its too big at ${this.heightToM(this.height)}m` )
            this.housepet=false
        };
        if(badTypes.some(r=> this.typeList.indexOf(r)>=0)){
            this.reason.push(`its on of dangerous types as ${this.typeList.join(' and ')}`)
            this.housepet= false
        }


        
    }


}



//dakika 1:00:00

