export function getResturants() {

    return Resturants.find({}).fetch()

}


export function getResturant(id) {

    var resturant = this.getResturants().find(o => o._id === id)
    if (resturant !== undefined) {
        return resturant;
    } else {
        return null;
    }
}
