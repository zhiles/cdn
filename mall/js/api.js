class Api {

    async store_list(data) {
        return await ask("/organ/findAllPage", data, "POST")
    }
}