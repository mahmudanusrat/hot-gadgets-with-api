const loadPhone = async (searchText ='13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}
const displayPhones = (phones, isShowAll) => {

    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    // display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container')
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }
    // console.log('is show all', isShowAll)
    // display only first 12 phones if not show All
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-white p-4 rounded-lg border-solid border-2 border-gray-300 `;
        // 3: set inner html
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" class="bg-blue-100 rounded-lg p-20 md:p-10 lg:p-28" /></figure>
        <div class="text-center mt-6 space-y-4">
            <h2 class="font-bold text-2xl">${phone.phone_name}</h2>
            <p class="text-[#706F6F] px-2">There are many variations of passages of available, but the majority have suffered</p>
            <P class="text-2xl font-bold" >$999</P>
            <div class="justify-center">
                <button onclick="handleShowDetail('${phone.slug}')" class="btn bg-[#0D6EFD] text-white border-0">Show Details</button>
            </div>
        </div>
        `;

        phoneContainer.appendChild(phoneCard);
    });

    // hide loading spinner
    toggleLoadingSpinner(false);
}

// 
const handleShowDetail = async (id) => {
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone)

}

const showPhoneDetails = (phone) => {
    console.log(phone);

    const showDetailContainer = document.getElementById('show-detail-container');

    showDetailContainer.innerHTML = `
    
        <img src="${phone.image}" alt="" class="md:px-28 p-4 bg-blue-100"/>
        <h1 class="text-2xl font-bold mt-3">${phone.name}</h1>
        <P class="text-base mt-3">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</P>
        <p class="mt-3 text-xl"><span class="font-semibold mt-3">Storage:</span>${phone?.mainFeatures?.storage}</p>
        <p class="mt-3 text-xl"><span class="font-semibold mt-3">Display Size:</span>${phone?.mainFeatures?.displaySize}</p>
        <p class="mt-3 text-xl"><span class="font-semibold mt-3">ChipSet:</span>${phone?.mainFeatures?.chipSet}</p>
        <p class="mt-3 text-xl"><span class="font-semibold mt-3">Memory:</span>${phone?.mainFeatures?.memory}</p>
        <p class="mt-3 text-xl"><span class="font-semibold mt-3">Slug:</span>${phone.slug}</p>
        <p class="mt-3 text-xl"><span class="font-semibold mt-3">Release Date:</span>${phone.releaseDate}</p>
        <p class="mt-3 text-xl"><span class="font-semibold mt-3">Brand:</span>${phone.brand}</p>
        <p class="mt-3 text-xl"><span class="font-semibold">GPS:</span>${phone.others?.GPS ? phone.others.GPS : 'No GPS available in this device'}</p>
    `
    // show the modal
    show_details_modal.showModal();
}


// handle search button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

const handleShowAll = () => {
    handleSearch(true);
}

loadPhone();