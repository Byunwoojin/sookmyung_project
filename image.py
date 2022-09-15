#-*- coding:utf-8 -*-
from PIL import Image
import os, sys

path = "/Users/woojin/문서/졸업작품/데이터/비닐추가/"
dirs = os.listdir( path )

def resize():
    for item in dirs:
        if os.path.isfile(path+item):
            im = Image.open(path+item)
            f, e = os.path.splitext(path+item)
            print(path)
            imResize = im.resize((512,384), Image.ANTIALIAS)
            imResize.save(f + ' resized.jpg', 'JPEG', quality=90)

resize()