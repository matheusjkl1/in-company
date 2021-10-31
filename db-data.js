use shellteste

db.users.insertMany([
{
  "name": "Joao Pedro",
  "email": "joao@joemail.com",
  "registrationNumber": "123456789",
  "password": "25f9e794323b453885f5181f1b624d0b",
  "role": "user"
},
{
  "name": "admin admin",
  "email": "admin@admin.com",
  "registrationNumber": "744336761",
  "password": "25f9e794323b453885f5181f1b624d0b",
  "role": "admin"
},
{
  "name": "Carlos Andrade",
  "email": "Carlos@admin.com",
  "registrationNumber": "148545651",
  "password": "25f9e794323b453885f5181f1b624d0b",
  "role": "user"
}
]);

db.certified.insertMany([{
  "registrationNumber": "123456789",
  "certifiedName": "Seminario de historia Update",
  "certifiedImage": "uploads/2021-10-31T03:45:56.667Z.jpeg",
  "certifiedDescript": "Atualizacao\nA realização do VI Seminário Internacional História e Historiografia: os usos políticos do passado no Brasil contemporâneo se constitui num importante eixo de consolidação e ampliação de uma rede de investigação e produção do conhecimento histórico compreendendo as regiões Norte, Nordeste e Centro-Oeste.",
  "hours": "10",
  "status": "Homologado"
},{
  "registrationNumber": "123456789",
  "certifiedName": "Seminario de historia Minas",
  "certifiedImage": "uploads/2021-10-31T07:11:35.835Z.jpeg",
  "certifiedDescript": "O Seminário Brasileiro de História da Historiografia (SNHH) é um evento bienal promovido pelo Núcleo de Estudos em História da Historiografia e Modernidade – NEHM, pela linha de pesquisa Ideias, Linguagens e Historiografia do Programa de Pós-Graduação em História da UFOP assim como pela Sociedade Brasileira de Teoria e História da Historiografia – SBTTH. O SNHH vem sendo realizado desde 2007 e contribuiu decisivamente para a consolidação da área de teoria da história e história da historiografia, campo essencial à formação dos historiadores porque estimula a reflexão em torno da escrita da história e sua relação com o presente. O evento, a partir de 2014 tornou-se bianual e terá lugar, em sua próxima edição, na cidade de Mariana, Minas Gerais.",
  "hours": "85",
  "status": "Homologado"
},{
  "registrationNumber": "123456789",
  "certifiedName": "Seminario de historia Rio de Janeiro",
  "certifiedImage": "uploads/2021-10-31T15:07:13.990Z.jpeg",
  "certifiedDescript": "A proposta interdisciplinar do evento, cuja primeira edição ocorreu na Universidade Federal Fluminense em 2018, pretende englobar profissionais de diferentes áreas do conhecimento, cujas pesquisas se debrucem ou tangenciem o conhecimento histórico. Como máxima dos eventos promovidos pela Anpuh-Rio, valorizamos a participação de pesquisadores em formação - graduandos e pós-graduandos - que terão espaço privilegiado de debate junto a outros profissionais de instituições de pesquisa do Brasil e exterior. ",
  "hours": "75",
  "status": "Não-Homologado"
},{
  "registrationNumber": "148545651",
  "certifiedName": "Seminario de Geografia",
  "certifiedImage": "uploads/2021-10-31T15:11:40.043Z.jpeg",
  "certifiedDescript": "Em resposta ao difícil contexto em que vivemos, os estudantes da pós-graduação e pesquisadores associados ao Departamento de Geografia da USP tomaram a iniciativa, em abril de 2020, de criar o Grupo de Trabalho Geografia e Covid-19, como ferramenta de mobilização e reflexão crítica acerca das dimensões geográficas da pandemia. O objetivo foi incentivar os discentes do Programa de Pós-Graduação em Geografia Humana do Departamento de Geografia da Universidade de São Paulo (PPGH-DG/USP) a produzir e publicar textos, podcasts e vídeos com análises e reflexões sobre a pandemia feitas a partir da perspectiva da Geografia. ",
  "hours": "25",
  "status": "Não-Homologado"
},{
  "registrationNumber": "148545651",
  "certifiedName": "Seminário de Geografia Minas Gerais",
  "certifiedImage": "uploads/2021-10-31T15:19:05.122Z.jpeg",
  "certifiedDescript": "O seminário de pesquisa nada mais é do que um procedimento metodológico que envolve o estudo em grupo sobre um determinado assunto e consiste da apresentação, análise e interpretação de dados sobre o assunto em questão.\n\nNo caso, cada um dos grupos deverá utilizar o software Kpresenter para elaborar uma apresentação de slides com as informações e imagens selecionadas.",
  "hours": "20",
  "status": "Não-Homologado"
}])