import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';

@ApiTags('Jogadores')
@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService) { }

    @Post()
    async criarAtualizarJogador(
        @Body() criarJogadorDto: CriarJogadorDto) {
        await this.jogadoresService.criarAtualizarJogador(criarJogadorDto)
    }

    @Get()
    async consultarJogadores(
        @Query('email') email: string): Promise<Jogador[] | Jogador> {

        if (email) {
            return await this.jogadoresService.consultarJogadoresPeloEmail(email)
        } else {
            return this.jogadoresService.consultarTodosJogadores()
        }

    }

    @Delete()
    async deletarJogador(
        @Query('email') email: string): Promise<string> {

        return this.jogadoresService.deletarJogador(email)
    }
}
