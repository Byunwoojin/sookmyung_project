import sys
import torch

link = 'https://catch-back.herokuapp.com'

def getName(name, age):
    print (name + " : " + age)
    
def getAnalysis(image):
    model = torch.load('model.pt')    
    result = model.predict(image)
    print(result)
    

if __name__ == '__main__':
    getAnalysis(link+"mage_pet.jpeg")
  
    

