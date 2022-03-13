import { Text } from 'react-native'
import { useQuery } from 'urql'

import getAllDirectors from '../../graphql/getAllDirectors.graphql'

import getAllFilms from '../../graphql/getAllFilms.graphql'

interface SortControlProps {

}

function SortControl({}: SortControlProps) {
  const [{ fetching, data, error }] = useQuery({
    query: getAllDirectors,
  })

  if (fetching) {
    return <Text>`Loading...`</Text>
  } else if (error) {
    return <Text>`Oh no! Error: ${error}`</Text>
  }

  return <Text>{JSON.stringify(data)}</Text>
}

export default SortControl
