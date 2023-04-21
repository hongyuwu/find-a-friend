// - 已经互相认识的朋友会用线连起来。
// 
// - 每个人都可以通过朋友介绍认识更多的人。
// 
// - 那么佩奇能不能认识到兔子这个新朋友呢？按下B后给出正确答案
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    custom.pageCanMeetRabbid()
})
custom.init()
