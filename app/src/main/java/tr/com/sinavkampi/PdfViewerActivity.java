package tr.com.sinavkampi;
import android.app.Activity;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.graphics.pdf.PdfRenderer;
import android.os.Bundle;
import android.os.ParcelFileDescriptor;
import android.view.Gravity;
import android.view.WindowInsets;
import android.widget.Button;
import android.widget.HorizontalScrollView;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/** Built-in, offline PDF reader; no external PDF app is required. */
public final class PdfViewerActivity extends Activity {
 private PdfRenderer renderer;private ParcelFileDescriptor descriptor;
 private final ExecutorService executor=Executors.newSingleThreadExecutor();
 private volatile boolean alive=true;private int zoom=100,baseWidth;
 private final java.util.ArrayList<ImageView> pages=new java.util.ArrayList<>();
 private final java.util.ArrayList<Float> ratios=new java.util.ArrayList<>();
 @Override public void onCreate(Bundle state){
  super.onCreate(state);getWindow().setStatusBarColor(Color.rgb(246,247,242));getWindow().setNavigationBarColor(Color.WHITE);
  LinearLayout root=new LinearLayout(this);root.setOrientation(LinearLayout.VERTICAL);root.setBackgroundColor(Color.rgb(239,242,233));
  root.setOnApplyWindowInsetsListener((v,i)->{android.graphics.Insets b=i.getInsets(WindowInsets.Type.systemBars()|WindowInsets.Type.displayCutout());v.setPadding(b.left,b.top,b.right,b.bottom);return i;});
  LinearLayout toolbar=new LinearLayout(this);toolbar.setGravity(Gravity.CENTER_VERTICAL);toolbar.setPadding(12,8,12,8);toolbar.setBackgroundColor(Color.rgb(249,250,246));
  Button back=new Button(this);back.setText("‹  Geri");back.setOnClickListener(v->finish());toolbar.addView(back);
  TextView title=new TextView(this);title.setText("Hazırlık PDF’si");title.setTextSize(14);title.setPadding(16,0,16,0);toolbar.addView(title,new LinearLayout.LayoutParams(0,-2,1));
  Button share=new Button(this);share.setText("Paylaş");share.setOnClickListener(v->{try{android.net.Uri uri=androidx.core.content.FileProvider.getUriForFile(this,getPackageName()+".files",new File(getCacheDir(),"pdfs/"+getIntent().getStringExtra("file")));android.content.Intent send=new android.content.Intent(android.content.Intent.ACTION_SEND).setType("application/pdf").putExtra(android.content.Intent.EXTRA_STREAM,uri).addFlags(android.content.Intent.FLAG_GRANT_READ_URI_PERMISSION);startActivity(android.content.Intent.createChooser(send,"PDF’yi paylaş")); }catch(Exception ignored){}});toolbar.addView(share);root.addView(toolbar);
  LinearLayout zoomBar=new LinearLayout(this);zoomBar.setGravity(Gravity.CENTER);zoomBar.setPadding(8,0,8,8);
  Button minus=new Button(this);minus.setText("−  Uzaklaş");Button plus=new Button(this);plus.setText("+  Yakınlaş");TextView amount=new TextView(this);amount.setText("  %100  ");amount.setTextSize(13);
  minus.setOnClickListener(v->{zoom=Math.max(75,zoom-25);amount.setText("  %"+zoom+"  ");resize();});plus.setOnClickListener(v->{zoom=Math.min(250,zoom+25);amount.setText("  %"+zoom+"  ");resize();});zoomBar.addView(minus);zoomBar.addView(amount);zoomBar.addView(plus);root.addView(zoomBar);
  ScrollView scroll=new ScrollView(this);scroll.setFillViewport(true);HorizontalScrollView horizontal=new HorizontalScrollView(this);horizontal.setFillViewport(true);LinearLayout content=new LinearLayout(this);content.setOrientation(LinearLayout.VERTICAL);content.setGravity(Gravity.CENTER_HORIZONTAL);content.setPadding(12,4,12,20);horizontal.addView(content);scroll.addView(horizontal);root.addView(scroll,new LinearLayout.LayoutParams(-1,0,1));setContentView(root);
  baseWidth=Math.max(600,getResources().getDisplayMetrics().widthPixels-36);
  String filename=getIntent().getStringExtra("file");if(filename==null||!filename.matches("[a-z0-9-]+\\.pdf")){finish();return;}
  executor.execute(()->{
   try{
    File dir=new File(getCacheDir(),"pdfs");dir.mkdirs();File file=new File(dir,filename);
    try(InputStream in=getAssets().open("www/pdfs/"+filename);FileOutputStream out=new FileOutputStream(file)){byte[] buffer=new byte[8192];int n;while((n=in.read(buffer))!=-1){out.write(buffer,0,n);}}
    descriptor=ParcelFileDescriptor.open(file,ParcelFileDescriptor.MODE_READ_ONLY);renderer=new PdfRenderer(descriptor);
    int count=renderer.getPageCount();
    for(int i=0;i<count&&alive;i++){
     PdfRenderer.Page page=renderer.openPage(i);int width=Math.min(1400,baseWidth*2),height=Math.round(width*(float)page.getHeight()/page.getWidth());Bitmap bitmap=Bitmap.createBitmap(width,height,Bitmap.Config.ARGB_8888);bitmap.eraseColor(Color.WHITE);page.render(bitmap,null,null,PdfRenderer.Page.RENDER_MODE_FOR_DISPLAY);float ratio=(float)page.getHeight()/page.getWidth();page.close();
     runOnUiThread(()->{if(!alive){bitmap.recycle();return;}ImageView image=new ImageView(this);image.setImageBitmap(bitmap);image.setAdjustViewBounds(true);image.setBackgroundColor(Color.WHITE);image.setContentDescription("PDF sayfa "+(pages.size()+1));pages.add(image);ratios.add(ratio);int w=baseWidth*zoom/100;content.addView(image,new LinearLayout.LayoutParams(w,Math.round(w*ratio)));android.widget.LinearLayout.LayoutParams lp=(LinearLayout.LayoutParams)image.getLayoutParams();lp.bottomMargin=18;image.setLayoutParams(lp);});
    }
   }catch(Exception e){runOnUiThread(()->{if(alive){TextView error=new TextView(this);error.setText("PDF açılamadı. Geri dönüp tekrar deneyebilirsin.");error.setPadding(30,50,30,50);content.addView(error);}});}
  });
 }
 private void resize(){for(int i=0;i<pages.size();i++){ImageView image=pages.get(i);int width=baseWidth*zoom/100;LinearLayout.LayoutParams p=(LinearLayout.LayoutParams)image.getLayoutParams();p.width=width;p.height=Math.round(width*ratios.get(i));image.setLayoutParams(p);}}
 @Override protected void onDestroy(){alive=false;executor.shutdownNow();for(ImageView image:pages){image.setImageDrawable(null);}pages.clear();try{if(renderer!=null)renderer.close();if(descriptor!=null)descriptor.close();}catch(Exception ignored){}super.onDestroy();}
}
