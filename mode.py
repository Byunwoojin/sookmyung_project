import sys
import torch


def getName(name, age):
    print (name + " : " + age)
    
def getAnalysis(image):
    model = torch.load('model.pt')    
    result = model.predict(image)
    print(result)
    

if __name__ == '__main__':
    getAnalysis("/Users/woojin/sookmyung_project/public/image_pet.jpeg")
  
    

