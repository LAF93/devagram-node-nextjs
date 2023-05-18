export default function Pessoa({nome, idade}) {
    return (
        <div className="pessoa">
            <b>Nome</b>: {nome}
            <br/>
            <b>Idade</b>: {idade}
            <br/>

            {idade >= 18 ? (
                    <span>Maior de Idade</span>
            ) : (
                <span>Menor de Idade</span>
            )}

            <br/>
            <br/>
        </div>
    );
}