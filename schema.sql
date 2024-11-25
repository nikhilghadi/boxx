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

     CREATE TABLE IF NOT EXISTS teams (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT,
      name TEXT,
      nation TEXT,
      head_coach TEXT,
      event_id INTEGER,
      FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
    );

      CREATE TABLE IF NOT EXISTS weight_classes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      label TEXT,
      class_name TEXT,  
      age_group TEXT,
      gender TEXT,
      event_id INTEGER,
      FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
    );

      CREATE TABLE IF NOT EXISTS athletes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT,
      last_name TEXT,
      dob date,
      age INTEGER,
      gender TEXT,
      weight FLOAT,
      height FLOAT,
      hand TEXT,
      weight_class_id INTEGER,
      team_id INTEGER,
      event_id INTEGER,
      FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
      FOREIGN KEY (weight_class_id) REFERENCES weight_classes(id) ON DELETE CASCADE,
      FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
    );
  
  create table if not EXISTS officials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT,
      last_name TEXT,
      status_in_bout TEXT,
      gender TEXT,
      dob date,
      age INTEGER,
      event_id INTEGER,
      FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
    );
create table if not EXISTS draws (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      round_number INTEGER,
      bout_number INTEGER,
      event_id INTEGER,
      weight_class_id INTEGER,
      is_bout_complete boolean,
      FOREIGN KEY (weight_class_id) REFERENCES weight_classes(id) ON DELETE CASCADE,
      FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
    );

    create table if not EXISTS draw_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      athlete_id INTEGER,
      draw_id INTEGER,
      position INTEGER,
      seed INTEGER,
      is_winner boolean,
      FOREIGN KEY (athlete_id) REFERENCES athletes(id) ON DELETE CASCADE,
      FOREIGN KEY (draw_id) REFERENCES draws(id) ON DELETE CASCADE
    );