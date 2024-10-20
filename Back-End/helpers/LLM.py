from together import Together

def get_touristic_route(API_KEY: str, places_content: str, person_content: str) -> str:
    client = Together(api_key=API_KEY)
    
    places_content = "Segue um JSON com os pontos turísticos ranqueados por relevância em um raio de distância aceitável da pessoa:" + "\n\n" + str(places_content)
    
    person_content = "Segue um JSON com as informações da pessoa que deseja fazer o roteiro turístico:" + "\n\n" + str(person_content)
    
    content = "Sou uma pessoa que quer fazer um roteiro turístico. Poderia me ajudar? Gostaria que meu roteiro tivesse entre 1 e 4 visitas a pontos turísticos. Por favor, retorne o resultado em um JSON com as informações dos pontos turísticos, nome, descrição, tempo estimado para cada visita, nível de preço, avaliação do negócio, se ele está aberto no momento, se ele está operacional no momento. Também considere que, caso a pessoa tenha selecionado alguma opção de alimentação, entre os pontos turísticos e dependendo do horário, indique lugares  da lista para comer (é válido pontuar que existem alguns pontos que não são de alimentação, como farmácias, na lista, logo tente excluir essa opções). Na distância, considere que depois que a pessoa for ao primeiro ponto turístico, ela vai desse ponto para o próximo ponto turístico, e assim vai. Não quero nenhum texto além do JSON, por favor, apenas o JSON."

    response = client.chat.completions.create(
        model="meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
        messages=[
        {
            "role": "system",
            "content": places_content
        },
        {
            "role": "system",
            "content": person_content
        },
        {
            "role": "user",
            "content": content
        }],
    )

    return response.choices[0].message.content