import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { CardContent, Button } from '@mui/material';

export type moodType = "sad" | "ok" | "happy"
export default function MoodPicker({
  mood,
  handlePickMood,
}: {
  mood: moodType,
  handlePickMood: (mood: moodType) => void,
}) {
  return (
    <CardContent>
      <div className="flex justify-evenly items-center"> 
          <Button
            title="sad"
            variant={mood=='sad' ? 'contained' : 'outlined'} 
            onClick={() => handlePickMood("sad")}
          >
          <SentimentVeryDissatisfiedIcon sx={{ verticalAlign: 'middle' }}/>
          </Button>
          <Button
          title="ok"
          variant={mood=='ok' ? 'contained' : 'outlined'}
          onClick={() => handlePickMood("ok")}
          >
          <SentimentNeutralIcon sx={{ verticalAlign: 'middle' }}/>
          </Button>
          <Button
          title="happy"
          variant={mood=='happy' ? 'contained' : 'outlined'}
          onClick={() => handlePickMood("happy")}
          >
          <SentimentSatisfiedAltIcon sx={{ verticalAlign: 'middle' }}/>
          </Button>
      </div>
  </CardContent>
  )
}