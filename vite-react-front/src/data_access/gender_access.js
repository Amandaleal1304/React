import { API_PATH } from "../constants/constants";



async function createGender(dataGender) {}

async function listGenders() {
    const res = await fetch(`${API_PATH}/Genders`);
    const genders = await res.json();
    return genders;
}

async function editGender() {}

async function deleteGender() {}

export { createGender, listGenders, editGender, deleteGender }