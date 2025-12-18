import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const creatorId = 6; 

async function main() {
  const movies = [
    {
      title: "Pulp Fiction",
      overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
      genre: "Crime, Drama",
      runtime: 154,
      releasedAt: new Date("1994-10-14"),
      rating: 8.9,
      language: "English",
      posterUrl: "https://image.tmdb.org/t/p/original/d5iIl9h9m9iP4RfsZgsYPB8u0mC.jpg",
      createdBy: creatorId,
    },
    {
      title: "Reservoir Dogs",
      overview: "When a simple jewelry hold-up goes horribly wrong, the surviving criminals begin to suspect that one of them is a police informant.",
      genre: "Crime, Thriller",
      runtime: 99,
      releasedAt: new Date("1992-10-23"),
      rating: 8.3,
      language: "English",
      posterUrl: "https://image.tmdb.org/t/p/original/xi8pS7xmNS762X41UpgpzdYp9Yv.jpg",
      createdBy: creatorId,
    },
    {
      title: "Inglourious Basterds",
      overview: "In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans.",
      genre: "War, Drama",
      runtime: 153,
      releasedAt: new Date("2009-08-21"),
      rating: 8.3,
      language: "English, German, French",
      posterUrl: "https://image.tmdb.org/t/p/original/7sfbEvG97S1IB9YjNoSLa86math.jpg",
      createdBy: creatorId,
    },
    {
      title: "Django Unchained",
      overview: "With the help of a German bounty hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner.",
      genre: "Western, Drama",
      runtime: 165,
      releasedAt: new Date("2012-12-25"),
      rating: 8.4,
      language: "English",
      posterUrl: "https://image.tmdb.org/t/p/original/7oWY8buyR087YI7YvYpY6YpP9Yp.jpg",
      createdBy: creatorId,
    },
    {
      title: "Kill Bill: Vol. 1",
      overview: "After awakening from a four-year coma, a former assassin wreaks revenge on the team of assassins who betrayed her.",
      genre: "Action, Crime",
      runtime: 111,
      releasedAt: new Date("2003-10-10"),
      rating: 8.2,
      language: "English, Japanese",
      posterUrl: "https://image.tmdb.org/t/p/original/v7TaRYQwYqbYd9uHxvC9SjO1qzh.jpg",
      createdBy: creatorId,
    },
    {
      title: "Kill Bill: Vol. 2",
      overview: "The Bride continues her quest of revenge against her former boss and lover Bill, the reclusive bouncer Budd, and the treacherous, one-eyed Elle Driver.",
      genre: "Action, Crime",
      runtime: 137,
      releasedAt: new Date("2004-04-16"),
      rating: 8.0,
      language: "English, Mandarin",
      posterUrl: "https://image.tmdb.org/t/p/original/2yhg0mZQMhHAnvYmY3D7oB4YvST.jpg",
      createdBy: creatorId,
    },
    {
      title: "Once Upon a Time in Hollywood",
      overview: "A faded television actor and his stunt double strive to achieve fame and success in the final years of Hollywood's Golden Age in 1969 Los Angeles.",
      genre: "Comedy, Drama",
      runtime: 161,
      releasedAt: new Date("2019-07-26"),
      rating: 7.6,
      language: "English",
      posterUrl: "https://image.tmdb.org/t/p/original/8j580EBv9mOF2iW3r80Ktm7p3Yp.jpg",
      createdBy: creatorId,
    },
    {
      title: "The Hateful Eight",
      overview: "In the dead of a Wyoming winter, a bounty hunter and his prisoner find shelter in a cabin currently inhabited by a collection of nefarious characters.",
      genre: "Western, Mystery",
      runtime: 168,
      releasedAt: new Date("2015-12-30"),
      rating: 7.8,
      language: "English",
      posterUrl: "https://image.tmdb.org/t/p/original/jIywRw9bPG9269qQvxEmubMG964.jpg",
      createdBy: creatorId,
    },
    {
      title: "Jackie Brown",
      overview: "A flight attendant with a criminal past gets nabbed by the ATF for smuggling. Under pressure to become an informant, she hatches a plot to play the agents against the smugglers.",
      genre: "Crime, Thriller",
      runtime: 154,
      releasedAt: new Date("1997-12-25"),
      rating: 7.5,
      language: "English",
      posterUrl: "https://image.tmdb.org/t/p/original/79fOAtvE2pSioXk086968m6S98r.jpg",
      createdBy: creatorId,
    },
    {
      title: "Death Proof",
      overview: "Two separate sets of voluptuous women are stalked at different times by a scarred stuntman who uses his 'death proof' cars to execute his murderous plans.",
      genre: "Thriller",
      runtime: 113,
      releasedAt: new Date("2007-04-06"),
      rating: 7.0,
      language: "English",
      posterUrl: "https://image.tmdb.org/t/p/original/oX9yX8vKqH6o828N5KshzO2uH7p.jpg",
      createdBy: creatorId,
    }
  ];

  console.log("Starting seeding...");

  for (const movie of movies) {
    const createdMovie = await prisma.movie.create({
      data: movie,
    });
    console.log(`Created: ${createdMovie.title}`);
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });