import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CriarJogadorDto } from "./dtos/criar-jogador.dto";
import { Jogador } from "./interfaces/jogador.interface";
import { v4 as uuidv4 } from "uuid"

@Injectable()
export class JogadoresService {

    private jogadores: Jogador[] = []

    private readonly logger = new Logger(JogadoresService.name)

    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {

        const { email } = criarJogadorDto

        const jogadorEncontrador = this.jogadores.find(jogador => jogador.email === email)

        if (jogadorEncontrador) {
            this.atualizar(jogadorEncontrador, criarJogadorDto)
        } else {
            await this.criar(criarJogadorDto)
        }

    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return this.jogadores;
    }

    async consultarJogadoresPeloEmail(email: string): Promise<Jogador> {

        const jogadorEncontrador = this.jogadores.find(jogador => jogador.email === email)
        if (!jogadorEncontrador) {
            throw new NotFoundException(`Jogador com email ${email} não encontrado`)
        }
        return jogadorEncontrador

    }

    async deletarJogador(email: string): Promise<string> {

        const jogadorEncontrador = this.jogadores.find(jogador => jogador.email === email)
        if (!jogadorEncontrador) {
            throw new NotFoundException(`Jogador com email ${email} não encontrado`)
        }
        this.jogadores = this.jogadores.filter(jogador => jogador.email !== jogadorEncontrador.email)
        return JSON.stringify(`Jogador com email ${email} deletado`)


    }

    private criar(criaJogadorDto: CriarJogadorDto): void {
        const { nome, telefoneCelular, email } = criaJogadorDto

        const jogador: Jogador = {
            _id: uuidv4(),
            nome,
            telefoneCelular,
            email,
            ranking: 'A',
            posicaoRanking: 1,
            urlFotoJogador: "www.google.com.br/foto123.jpg'"
        }
        this.logger.log(`criaJogadorDto: ${JSON.stringify(jogador)}`)

        this.jogadores.push(jogador);

    }

    private atualizar(jogadorEncontrador: Jogador, criarJogadorDto: CriarJogadorDto): void {
        const { nome } = criarJogadorDto

        jogadorEncontrador.nome = nome
    }


}