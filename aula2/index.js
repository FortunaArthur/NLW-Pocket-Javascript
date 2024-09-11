// while
// const start = () => {
//     let n = 0

//     while(n <= 10){
//         console.log(n)
//         n++
//     }
// }

// start()

const {select, input, checkbox} = require('@inquirer/prompts')

let meta ={
    value: "AGUA",
    checked: false
}

let metas = [meta]

const cadastrarMeta =  async () => {
    const meta = await input({message: "Escreve tua meta ai:"})

    if(meta.length == 0){
        console.log("Meta vazia, Pode N man")
        return cadastrarMeta()
    }

    metas.push({value: meta, checked: false})
}

const listarMeta = async () => {
    const respostas = await checkbox({
        message: "as seta muda a meta, espaço marca ou desmarca, enter finaliza",
        choices: [...metas],
        instructions: false
    })

    if(respostas.length == 0) {
        console.log("N escolheu nenhuma")
        return
    }

    metas.forEach((m) =>{
        m.checked = false
    })

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })
        meta.checked = true
    })

    console.log("concluiu")
}

// async
const start = async () => {

    while(true){
        // let opcao = "cadastro"
        // await
        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                name: "Cadastrar meta",
                value: "cadastro"
            },{
                name:"Listar meta",
                value:"listar"
            },
            {
                name: "Sair",
                value: "sair"
            }
        ]
        })

        switch(opcao) {
            case "cadastro":
                await cadastrarMeta()
                console.log(metas)
                break
            case "listar":
                await listarMeta()
                break
            case "sair":
                return
        }
    }
}

start()