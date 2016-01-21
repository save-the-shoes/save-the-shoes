
teams = (1..4)
messages = {
  relief_assemble: 'Relief crew assemble!',
  relief_in: 'Relief crew enter!'
}

teams.each do |team|
  messages.each do |message_name, message|
    filename = "team_#{team}_#{message_name}"
    `say -v 'Daniel' "Team #{team}, #{message}, Team #{team}, #{message}" -o #{filename}`
    `lame -m m #{filename}.aiff #{filename}.mp3`
    `rm #{filename}.aiff`
  end
end
