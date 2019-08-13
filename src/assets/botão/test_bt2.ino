#include "DigiKeyboard.h"

void setup() {
  pinMode(0, INPUT);
  pinMode(1, OUTPUT);
  pinMode(2, OUTPUT);

  digitalWrite(1, LOW);
  digitalWrite(2, HIGH);

  // Makes OS identify this device as keyboard
  DigiKeyboard.sendKeyStroke(0);
}

void loop()
{
  if(digitalRead(0) == LOW)
  {
    generatePassword();    
  }
}

// Example to use Digispark as physical password token
void insertPassword()
{
  DigiKeyboard.println("SuperSecretPassword");
}

// Example to open terminal and call script to generate new password
void generatePassword()
{
  DigiKeyboard.sendKeyStroke(0);
  DigiKeyboard.sendKeyStroke(KEY_SPACE);
  delay(500);
  
  
}


    
