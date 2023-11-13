import {sql} from './db.js'

sql`
CREATE TABLE IF NOT EXISTS curso (
	codigo serial PRIMARY KEY,
	descricao VARCHAR ( 50 ) UNIQUE NOT NULL,
	ementa text NOT NULL
);
`.then(() => {
    console.log('Tabela criada com sucesso!');
});

sql`
CREATE TABLE IF NOT EXISTS aluno (
	codigo serial PRIMARY KEY,
	nome VARCHAR ( 50 ) NOT NULL
);
`.then(() => {
    console.log('Tabela Aluno criada com sucesso!');
});

sql`
CREATE TABLE IF NOT EXISTS curso_aluno (
	codigo serial PRIMARY KEY,
	codigo_aluno INTEGER REFERENCES aluno(codigo),
	codigo_curso INTEGER REFERENCES curso(codigo)
);
`.then(() => {
    console.log('Tabela de relação criada com sucesso!');
});