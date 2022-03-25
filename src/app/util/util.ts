export class Util {
  dataBRtoDataIso(data: String){
    const dataarr  = data.toString().split('/');
    return dataarr[2] + '-' + dataarr[1] + '-' + dataarr[0]
  }
}
