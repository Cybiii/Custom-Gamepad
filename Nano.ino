#define X_PIN A0
#define Y_PIN A1
#define A_PIN A2
#define B_PIN A3

#define THRESHOLD 512

bool xButtonState = false;
bool yButtonState = false;
bool aButtonState = false;
bool bButtonState = false;

void setup() {
  Serial.begin(9600);

  pinMode(X_PIN, INPUT);
  pinMode(Y_PIN, INPUT);
  pinMode(A_PIN, INPUT);
  pinMode(B_PIN, INPUT);

  pinMode(LED_BUILTIN, OUTPUT);
  for (int i = 0; i < 3; i++) {
    digitalWrite(LED_BUILTIN, HIGH);
    delay(200);
    digitalWrite(LED_BUILTIN, LOW);
    delay(200);
  }
}

void loop() {
 
  int xValue = analogRead(X_PIN);
  int yValue = analogRead(Y_PIN);
  int aValue = analogRead(A_PIN);
  int bValue = analogRead(B_PIN);

  bool newXButtonState = xValue > THRESHOLD;
  if (newXButtonState != xButtonState) {
    if (newXButtonState) {
      Serial.println("X_PRESS");
    } else {
      Serial.println("X_RELEASE");
    }
    xButtonState = newXButtonState;
  }

  bool newYButtonState = yValue > THRESHOLD;
  if (newYButtonState != yButtonState) {
    if (newYButtonState) {
      Serial.println("Y_PRESS");
    } else {
      Serial.println("Y_RELEASE");
    }
    yButtonState = newYButtonState;
  }

  bool newAButtonState = aValue > THRESHOLD;
  if (newAButtonState != aButtonState) {
    if (newAButtonState) {
      Serial.println("A_PRESS");
    } else {
      Serial.println("A_RELEASE");
    }
    aButtonState = newAButtonState;
  }

  bool newBButtonState = bValue > THRESHOLD;
  if (newBButtonState != bButtonState) {
    if (newBButtonState) {
      Serial.println("B_PRESS");
    } else {
      Serial.println("B_RELEASE");
    }
    bButtonState = newBButtonState;
  }

  delay(50);
}