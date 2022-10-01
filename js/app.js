document.addEventListener('DOMContentLoaded', () => {
    const rnd = getRandomInt(1, 151);

    // console.log(rnd);

    fetchData(rnd);
});

// Notesé que también en este caso `min` será incluido y `max` excluido
// https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

const fetchData = async(n) => {
    try {
        // console.log(rnd);
        const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${ n }`);
        const respData = await resp.json();

        // console.log(respData)
        const pokeData = {
            url: respData.sprites.other.dream_world.front_default,
            nombre: respData.name,
            experiencia: respData.base_experience,
            hp: respData.stats[0].base_stat,
            ataque: respData.stats[1].base_stat,
            defensa: respData.stats[2].base_stat,
            especial: respData.stats[3].base_stat,
        }

        pintarCard(pokeData);

    } catch (error) {
        console.log(error);
    }
}

const pintarCard = (poke) => {
    // console.log(poke);
    // const flex = document.getElementsByClassName('flex');
    // const templatecard = document.getElementById('template-card');

    const flex = document.querySelector('.flex');
    const templatecard = document.querySelector('#template-card').content;

    // console.log(flex);
    // console.log(templatecard);
    const templateClone = templatecard.cloneNode(true);
    const fragment = document.createDocumentFragment();

    templateClone.querySelector('.card-body-img').setAttribute('src', poke.url);
    templateClone.querySelector('.card-body-title').innerHTML = `${poke.nombre}  <span>${poke.hp} hp</span>`;
    templateClone.querySelector('.card-body-text').textContent = `${poke.experiencia} Exp`;
    templateClone.querySelectorAll('.card-footer-social h3')[0].textContent = `${poke.ataque}`;
    templateClone.querySelectorAll('.card-footer-social h3')[1].textContent = `${poke.especial}`;
    templateClone.querySelectorAll('.card-footer-social h3')[2].textContent = `${poke.defensa}`;

    fragment.appendChild(templateClone);

    flex.appendChild(fragment);
}