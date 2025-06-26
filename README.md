# after i've logged in to the site i should see a create list option and i should be able to create multiple lists, so it redirects me to create lists page where it shows all the created lists by the user, i would have to add a userLists table in db with a 1(user)to many(lists)relationship :the table would be storing storing stored movies, userid.

# for each list there would be a id, createdat, title , userid(fk)

# do the frontend first

# one movie can be in multiple lists too, in the moviecard just store in which lists the movie is into and in the backend jpa will handle the relantionship automatically.

# ok so now when i open a list i should see all the movies that i have added to the list. right but before that i need to be able to add movies to the list so on the movie card add an option of add to list and we shall be able to add the movie to the chosen list.

# ok so to add the movie to the user specified lists we would need movieId, userId, List<userLists> into which the movie is gonna be added to.

# {

    userId, movieId, [list1, list2](list of lists);

}
