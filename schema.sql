 CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      subtitle TEXT,
      city TEXT,
      location TEXT,
      date date,
      tournament_organisation_auto boolean,
      symmetrical_draw boolean,
      number_of_rounds INTEGER,
      rest_time INTEGER,
      num_of_judges INTEGER
    );

     CREATE TABLE IF NOT EXISTS events1 (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      subtitle TEXT,
      city TEXT,
      location TEXT,
      date date,
      tournament_organisation_auto boolean,
      symmetrical_draw boolean,
      number_of_rounds INTEGER,
      rest_time INTEGER,
      num_of_judges INTEGER
    )