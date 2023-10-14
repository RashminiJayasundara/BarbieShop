import React from 'react'
import {GoStarFill} from 'react-icons/go';
import {GoStar} from 'react-icons/go';
import {BsStarHalf} from 'react-icons/bs';
export default function Ratings(props) {
    const {ratings,numreviews} =props
  return (
    <div >
        <span>
        {ratings>=1?(<GoStarFill></GoStarFill>):
        ratings>=0.5?(<BsStarHalf></BsStarHalf>):
        (<GoStar></GoStar>)}
        </span>
        <span>
        {ratings>=2?(<GoStarFill></GoStarFill>):
        ratings>=2.5?(<BsStarHalf></BsStarHalf>):
        (<GoStar></GoStar>)}
        </span>
        <span>
        {ratings>=3?(<GoStarFill></GoStarFill>):
        ratings>=3.5?(<BsStarHalf></BsStarHalf>):
        (<GoStar></GoStar>)}
        </span>
        <span>
        {ratings>=4?(<GoStarFill></GoStarFill>):
        ratings>=4.5?(<BsStarHalf></BsStarHalf>):
        (<GoStar></GoStar>)}
        </span>
        <span>{numreviews} reviews</span>
    </div>
  )
}
