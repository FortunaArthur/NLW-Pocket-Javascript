const {select, input, checkbox} = require('@inquirer/prompts')

const fs = require("fs").promises

let metas

const carregarMeta = async () => {
    try{
        const dados = await fs.readFile("metas.json")
        metas = JSON.parse(dados)
    }
    catch(erro) {};

}

const salbarMeta = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}

let mensagem ="BIEN VENIDO LA eSTE APP DO KRL"

const cadastrarMeta =  async () => {
    const meta = await input({message: "Escreve tua meta ai:"})

    if(meta.length == 0){
        mensagem = "Meta vazia, Pode N man"
        return cadastrarMeta()
    }

    metas.push({value: meta, checked: false})

    mensagem="KADASTROU"
}

const listarMeta = async () => {
    if(metas.length == 0){
        mensagem = "Não Tem"
        return
    }

    const respostas = await checkbox({
        message: "as seta muda a meta, espaço marca ou desmarca, enter finaliza",
        choices: [...metas],
        instructions: false
    })

    metas.forEach((m) =>{
        m.checked = false
    })

    if(respostas.length == 0) {
        mensagem = "N escolheu nenhuma"
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })
        meta.checked = true
    })

    mensagem = "concluiu"
}

const metasRealizadas = async () => {
    if(metas.length == 0){
        mensagem = "Não Tem"
        return
    }

    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0) {
        mensagem = 'N tem'
        return
    }

    await select ({
        message: "Metas Realizadas: " + realizadas.length,
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    if(metas.length == 0){
        mensagem = "Não Tem"
        return
    }

    const abertas = metas.filter((meta) =>  {
        return meta.checked != true
    })

    if (abertas.length == 0) {
        mensagem = 'N tem Meta'
        return
    }

    await select ({
        message: "Metas Abertas: " + abertas.length,
        choices: [...abertas]
    })
}

const deletarMeta = async() => {
    if(metas.length == 0){
        mensagem = "Não Tem"
        return
    }

    const metasDesmarcadas = metas.map((meta) =>{
        return {value: meta.value, checked: false}
    })

    const itensAdeletar = await checkbox({
        message: "seta sobe/dece, espaço marca ou desmarca, enter deleta",
        choices: [...metasDesmarcadas],
        instructions: false
    })

    if(itensAdeletar.length == 0) {
        mensagem = "Deleto nenhum"
        return
    }

    itensAdeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    mensagem = "Deketou"
}

const mostrarMensagem =() => {
    console.clear();
    if(mensagem != ""){
        console.log(mensagem)
        console.log("")
        mensagem=""
    }

}

// async
const start = async () => {
    await carregarMeta()

    while(true){
        // let opcao = "cadastro"
        // await
        mostrarMensagem()
        await salbarMeta()
        const opcao = await select({
            message: "Menu >",
            choices: [
            {
                name: "Cadastrar meta",
                value: "cadastro"
            },
            {
                name:"Listar meta",
                value:"listar"
            },
            {
                name:"Metas Realizadas",
                value:"realizadas"
            },
            {
                name:"Metas Abertas",
                value:"abertas"
            },
            {
                name:"Deletar Metas",
                value:"deletar"
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
                break
            case "listar":
                await listarMeta()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "deletar":
                await deletarMeta()
                break
            case "sair":
                console.log("vaza")
                return
        }
    }
}

start()