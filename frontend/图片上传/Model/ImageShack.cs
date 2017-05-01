using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Windows.Storage;
using Windows.Web.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace App1.Model
{
	public class ImageShack
	{
		public StorageFile File
		{
			set;
			get;
		}

		/// <summary>
		///     上传返回
		/// </summary>
		public string ResponseString
		{
			set;
			get;
		}

		public EventHandler<string> OnUploadedEventHandler
		{
			set;
			get;
		}

		/// <summary>
		///     上传图片
		/// </summary>
		public async void UpLoad()
		{
			string url = "https://api.ocr.space/parse/image";
			HttpClient webHttpClient = new HttpClient();
			HttpMultipartFormDataContent httpMultipartFormDataContent =
					new HttpMultipartFormDataContent();

			var fileContent = new HttpStreamContent(await File.OpenAsync(FileAccessMode.Read));
			fileContent.Headers.Add("Content-Type", "application/octet-stream");
			httpMultipartFormDataContent.Add(fileContent, "file", File.Name);

			var stringContent = new HttpStringContent("fb8f59d6d088957");

			httpMultipartFormDataContent.Add(stringContent, "apikey");
			var str = await webHttpClient.PostAsync(new Uri(url), httpMultipartFormDataContent);
			JObject data = JObject.Parse(str.Content.ToString());
			ResponseString = data["ParsedResults"][0]["ParsedText"].ToString();
			OnUploadedEventHandler?.Invoke(this, ResponseString);
		}
	}
}
